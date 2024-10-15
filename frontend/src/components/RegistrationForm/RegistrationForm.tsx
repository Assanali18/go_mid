import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../service/axios";

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            // Отправляем данные регистрации на сервер
            await axiosInstance.post('/register', {
                email,
                password
            });

            // После успешной регистрации перенаправляем на страницу входа
            navigate('/login');
        } catch (error) {
            console.error('Ошибка при регистрации', error);
            setError('Произошла ошибка при регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegistrationForm;
