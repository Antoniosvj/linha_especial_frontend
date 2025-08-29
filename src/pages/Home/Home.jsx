import { useEffect, useState } from 'react';
import { produtosService } from '../../services/ProdutosService';
import { CardItem } from '../../components';

export const HomePage = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() =>{
            const fetchProdutos = async () =>{
            const data = await produtosService.getProdutos();
            setProdutos(data);
        }
        fetchProdutos();
        }, []);

    return (
        <div>
            {produtos.map(produto =>(
                <CardItem key={produto.id} produto={produto}/>
            ))}
        </div>
    )
};