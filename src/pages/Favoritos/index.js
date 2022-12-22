import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function removerFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !==id);
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success('Filme removido com sucesso!');
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus favoritos</h1>

            {filmes.length === 0 && 
                <div className='meus-filmes-vazio'>
                    <span> Você não possui nenhum filme salvo nos favoritos</span>
                </div>
                
            }

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>
                                    Ver detalhes
                                </Link>
                                <button onClick={() => removerFilme(item.id)}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;