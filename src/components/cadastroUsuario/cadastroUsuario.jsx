import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { CadastrarUsuario } from '../../services';
import style from './cadastroUsuario.module.css';

export const CadastroUsuario = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        password: ""
    });
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    // Novo estado para o status de cada regra da senha
    const [passwordRules, setPasswordRules] = useState({
        minChars: false,
        oneUppercase: false,
        oneLowercase: false,
        oneNumber: false,
        oneSpecial: false,
    });

    // Função para validar a senha em tempo real e atualizar o status das regras
    const validatePasswordRules = (password) => {
        const rulesStatus = {
            minChars: password.length >= 8,
            oneUppercase: /[A-Z]/.test(password),
            oneLowercase: /[a-z]/.test(password),
            oneNumber: /[0-9]/.test(password),
            oneSpecial: /[^A-Za-z0-9\s]/.test(password), // Caractere especial
        };
        setPasswordRules(rulesStatus);

        // Retorna true se todas as regras forem cumpridas, false caso contrário
        return Object.values(rulesStatus).every(rule => rule === true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "password") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
            // Valida as regras da senha em tempo real
            validatePasswordRules(value);
            // Verifica a repetição da senha ao mesmo tempo
            if (repeatPassword && value !== repeatPassword) {
                setRepeatPasswordError("As senhas não conferem.");
            } else {
                setRepeatPasswordError("");
            }
        } else if (name === "repeatPassword") {
            setRepeatPassword(value);
            if (value !== formData.password) {
                setRepeatPasswordError("As senhas não conferem.");
            } else {
                setRepeatPasswordError("");
            }
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação final de todas as regras da senha
        const isPasswordValid = validatePasswordRules(formData.password);
        if (!isPasswordValid) {
            alert("Por favor, preencha todos os requisitos da senha.");
            return;
        }

        // Validar se as senhas conferem
        if (formData.password !== repeatPassword) {
            setRepeatPasswordError("As senhas não conferem.");
            return;
        } else {
            setRepeatPasswordError("");
        }

        setLoading(true);
        try {
            await CadastrarUsuario(formData);
            setFormData({ 
                 nome: "",
                 telefone: "",
                 email: "",
                 password: "",
            });
            setRepeatPassword("");
            navigate('/')
        } catch (error) {
            alert(`Erro ao cadastrar usuário: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={style.container}>
                <form onSubmit={handleSubmit}>
                    <h2>1. Informações Pessoais</h2>
                    <div className={style.formGroup}>
                        <label htmlFor="nome">Nome completo:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className={style.formGroup}>
                        <label htmlFor="telefone">Telefone:</label>
                        <PatternFormat
                            id="telefone"
                            name="telefone"
                            placeholder="(DD) XXXXX-XXXX"
                            onChange={handleChange}
                            value={formData.telefone}
                            format="+55(##)#####-####"
                            mask="_"
                            patternChar="#"
                            required
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="contato@email.com.br"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                        {/* Regras da senha */}
                        <ul className={style.passwordRules}>
                            <li className={passwordRules.minChars ? style.validRule : style.invalidRule}>
                                Pelo menos 8 caracteres
                            </li>
                            <li className={passwordRules.oneUppercase ? style.validRule : style.invalidRule}>
                                Pelo menos 1 letra maiúscula
                            </li>
                            <li className={passwordRules.oneLowercase ? style.validRule : style.invalidRule}>
                                Pelo menos 1 letra minúscula
                            </li>
                            <li className={passwordRules.oneNumber ? style.validRule : style.invalidRule}>
                                Pelo menos 1 número
                            </li>
                            <li className={passwordRules.oneSpecial ? style.validRule : style.invalidRule}>
                                Pelo menos 1 caractere especial
                            </li>
                        </ul>
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="repeatPassword">Repita a Senha:</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            onChange={handleChange}
                            value={repeatPassword}
                            required
                        />
                        {repeatPasswordError && <p className={style.errorText}>{repeatPasswordError}</p>}
                    </div>

                    <div className={style.buttonContainer}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>
            
        </>
    );
};