import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import api from '../../services/api';
import Loading  from '../../components/Loading';

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '94746dd7a923e2b8803aa04f650611ea',
                    language: 'pt-BR',
                    page: 1
                }
            });

            setFilmes(response.data.results.slice(0,12));
            setLoading(false);
        }

        loadFilmes();
    }, [])

    if(loading) {
        return(
           <Loading />
        )
    }

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {
                    filmes.map((filme) => {
                        return(
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;