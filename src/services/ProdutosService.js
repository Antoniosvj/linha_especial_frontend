import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}produtos`;

const getCategoriasProdutos = async () =>{
    try{
        const response = await axios.get(`${url}/categorias`);
        return response.data;
    } catch (error){
        console.error("Erro ao buscar categorias.");
        throw error;
    }
}

const getProdutosPorCategoria = async (categoria) =>{
    try{
        console.log(categoria)
        const response = await axios.get(`${url}/categoria`, {
            params: {
                categoria: categoria
            }
        });
        console.log(response);
        return response.data;
    }catch (error){
        console.error("Erro ao buscar produtos por categoria.");
        throw error;
    }
}

export const produtosService = {
    getCategoriasProdutos,
    getProdutosPorCategoria
};