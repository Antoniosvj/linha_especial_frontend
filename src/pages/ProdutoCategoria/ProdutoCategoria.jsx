import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { produtosService } from "../../services/ProdutosService";
import { CardItem } from "../../components";

import style from './ProdutoCategoria.module.css';

export const ProdutoCategoriaPage = () =>{
    const { categoria } = useParams();
    const [produtos, setProdutos] = useState([]);

    useEffect(() =>{
        const fetchProdutos = async () =>{
        const data = await produtosService.getProdutosPorCategoria(categoria);
        setProdutos(data);
    }
    fetchProdutos();
    }, [categoria]);



    return (
        <div className={style.containerCategorias}>
            <div className={style.containerTitulo}>
                <h1>{categoria}</h1>    
            </div>
            {produtos.map(produto =>(
                <CardItem key={produto.id} produto={produto} />
            )
            )}
        </div>
    )
}