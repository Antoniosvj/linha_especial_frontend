import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { produtosService } from "../../services/ProdutosService";

export const ProdutoCategoria = () =>{
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
        <div>
            Produto por categoria: {categoria}
            {produtos.map(produto =>(
                <div key={produto.id}>
                    <h1>
                        {produto.nome}
                    </h1>
                    <small>{produto.categoria}</small>
                    <p>
                        {produto.descricao}
                    </p>
                    <h2>{produto.preco}</h2>
                </div>
            )
            )}
        </div>
    )
}