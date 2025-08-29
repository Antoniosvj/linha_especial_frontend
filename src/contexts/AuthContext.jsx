import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Pode ser um objeto com id, nome, token, etc.
    const [isLoading, setIsLoading] = useState(true);

    // Lógica para verificar o token no localStorage ao carregar
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Aqui você faria uma chamada para a API para validar o token e buscar dados do usuário
            // Por enquanto, vamos simular um usuário logado
            setUser({ id: '123', name: 'Usuário Teste', token });
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        // Lógica de autenticação com a API
        // Exemplo: const response = await api.post('/login', { email, password });
        // const token = response.data.token;

        const fakeToken = "abc12345"; // Simulação de token
        localStorage.setItem('authToken', fakeToken);
        setUser({ id: '123', name: 'Usuário Teste', token: fakeToken });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};