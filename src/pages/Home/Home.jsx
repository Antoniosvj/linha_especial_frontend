import { useEffect, useState } from 'react';
import axios from 'axios';

export const HomePage = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/produtos');
                console.log("Resposta da API:", response); // Adicione esta linha
                setProdutos(response.data);
            } catch (err) {
                console.error('Erro na requisição:', err); // Adicione esta linha
                setError('Ocorreu um erro ao carregar os produtos.');
            }
        };
        fetchProdutos();
    }, []);

    // ... restante do código
};