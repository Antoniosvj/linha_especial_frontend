import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./Header.module.css";
import { produtosService } from '../../services/ProdutosService';


export const Header = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchProdutos = async () =>{
            try{
                const data = await produtosService.getCategoriasProdutos();
                setCategorias(data);
            } catch(err){
                setError('Ocorreu um erro ao carregar as categorias.');
                console.error(err);
            } finally{
                setLoading(false);
            }
        }

        fetchProdutos();
    }, []);

    if (loading){
        return <p>Carregando categorias...</p>
    }

    if(error){
        return <p>{error}</p>
    }

  const handleSubmit = () => {
    //função pesquisa
  };

  return (
    <header className={style.Header}>
        <section>

      <div>
        <Link to='/'>
        <img
          className={style.logo}
          src="/Linha_especial.png"
          alt="Linha Especial"
        />
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={style.formGroup}>
          <div className={style.formInput}>
            <input type="text" placeholder="O que você procura?" />
          </div>
          <div className={style.formButton}>
            <button type="submit" >
            <img src="/magnifying-glass.png" alt="" />
          </button>
          </div>
        </form>
      </div>
      <a href="" className={style.login}>
        <img src="/user.png" alt="Login" />
      </a>
        </section>
        <section className={style.containerCategoria}>
            {categorias.map(categoria => (
                <div key={categoria} >
                    <Link className={style.link} to={`/categoria/${categoria}`}>{categoria}</Link>
                </div>
            ))}
        </section>
    </header>
  );
};
