import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../../service/axios';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('users/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            navigate('/');
        } catch (error) {
            console.error('Ошибка при входе', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Вход</h2>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Войти
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>Нет аккаунта? <Link to="/register"
                                       className="text-blue-500 hover:underline">Зарегистрироваться</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
