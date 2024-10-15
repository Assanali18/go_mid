import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/axios';

interface Task {
    title: string;
    description: string;
    category: string;
    status: string;
}

const TaskForm: React.FC = () => {
    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        category: '',
        status: 'To Do',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/tasks', task);
            navigate('/'); // Перенаправляем на главную страницу после создания задачи
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
            // Здесь можно добавить отображение сообщения об ошибке для пользователя
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Создать новую задачу</h2>
            <div>
                <label htmlFor="title">Название:</label>
                <input
                    type="text"
                    id="title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Описание:</label>
                <textarea
                    id="description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="category">Категория:</label>
                <input
                    type="text"
                    id="category"
                    value={task.category}
                    onChange={(e) => setTask({ ...task, category: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="status">Статус:</label>
                <select
                    id="status"
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Process">In Process</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button type="submit">Создать задачу</button>
        </form>
    );
};

export default TaskForm;
