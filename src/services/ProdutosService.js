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

const getProdutos = async () =>{
    try{
        const response = await axios.get(`${url}`);
        return response.data;
    }catch (error){
        console.error("Erro ao buscar produtos.");
        throw error;
    }
}

const getProdutosPorCategoria = async (categoria) =>{
    try{
        const response = await axios.get(`${url}/categoria`, {
            params: {
                categoria: categoria
            }
        });
        return response.data;
    }catch (error){
        console.error("Erro ao buscar produtos por categoria.");
        throw error;
    }
}

const getProdutoPorId = async (id) => {
    console.log(id);
    try{
        const response = await axios.get(`${url}/${id}`, {
            body: {
                id: id
            }
        });
        return response.data;
    }catch (error){
        console.error("Erro ao buscar produto.");
        throw error;
    }

}
export const produtosService = {
    getCategoriasProdutos,
    getProdutosPorCategoria,
    getProdutoPorId,
    getProdutos
};