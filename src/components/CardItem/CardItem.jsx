import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './CardItem.module.css';

export const CardItem = ({ produto }) => {
  const url = `${import.meta.env.VITE_IMAGEM_URL}`;
  const urlCompleta = `${url}${produto.imagemUrl}`;
    const [isFavorited, setIsFavorited] = useState(false);
  const precoFormatado = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const toggleFavorite = () =>{
    setIsFavorited(!isFavorited);
  };


  return (
    <div key={produto.id} className={style.containerCardItem}>
      <Link to={`/produto/${produto.nome}?id=${produto.id}`} className={style.containerImg}>
        <img src={urlCompleta} alt={produto.nome} />
      </Link>
      <div className={style.containerCoracao} onClick={toggleFavorite}>
        <img src={isFavorited ? "/coracao(1).png" : "/coracao.png"} alt="" />
      </div>
      <div className={style.containerDetalhes}>
        <h2>A partir de <strong>{precoFormatado}</strong></h2>
        <p>{produto.nome}</p>
      </div>
    </div>
  );
};
