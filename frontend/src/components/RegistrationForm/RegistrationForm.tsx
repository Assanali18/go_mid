import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/axios';

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            await axiosInstance.post('/users/register', {
                email,
                password,
            });

            navigate('/login');
        } catch (error) {
            console.error('Ошибка при регистрации', error);
            setError('Произошла ошибка при регистрации');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
                {error && <p className="text-red-500">{error}</p>}
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
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Подтвердите пароль:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
