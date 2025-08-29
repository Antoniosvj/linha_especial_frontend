const USERS_API_URL = `${import.meta.env.VITE_API_URL}app/usuarios.php`;

export const CadastrarUsuario = async (data) => {
    try {
        const response = await fetch(USERS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || `Erro ao cadastrar usuário.`);
        }
        return responseData.id;

    } catch (error) {
        console.error("Erro no serviço de cadastro de usuário:", error);
        throw error;
    }
};
