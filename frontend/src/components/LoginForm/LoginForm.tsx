import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../service/axios";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('users/login', {
                email,
                password
            });

            // Сохраняем токен в localStorage
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Перенаправляем на главную страницу после успешного входа
            navigate('/');
        } catch (error) {
            console.error('Ошибка при входе', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
