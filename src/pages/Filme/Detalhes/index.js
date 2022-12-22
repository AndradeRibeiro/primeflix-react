import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading  from '../../../components/Loading';
import api from '../../../services/api';
import './style.css';

function Filme() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: '94746dd7a923e2b8803aa04f650611ea',
                    language: 'pt-BR',
                }
            }).then((response) => {
                setFilme(response.data);
                setLoading(false);
            }).catch(() => {
                navigate('/', { replace: true});
            });

        }

        loadFilme();

        return () => {
            console.log("componente foi desmontado")
        }

    }, [id, navigate]);

    function adicionarFilmeFavoritos() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if(hasFilme) {
            toast.warn('Este filme já esta na lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme adicionado aos favoritos com sucesso!');
        navigate('/', { replace: true});
    }

    if(loading) {
        return(
           <Loading />
        )
    }

    return(
        <div className="filme-info">
            <h2>{filme.title}</h2>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed()} / 10 </strong>

            <div className="container-buttons">
                <button className="button-add-favoritos" onClick={adicionarFilmeFavoritos}>
                    Adicionar aos favoritos
                </button>
                <button className="button-trailer">
                    <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;