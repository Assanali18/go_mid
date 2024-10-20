import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/axios';
import { Task } from '../../models/Task';

const TaskDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosInstance.get(`/tasks/${id}`);
                console.log('Task data:', response.data);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Ошибка при загрузке задачи');
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) return;

        try {
            await axiosInstance.delete(`/tasks/${id}`);
            alert('Задача удалена');
            navigate('/');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Ошибка при удалении задачи');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error || !task) {
        return <div>{error || 'Задача не найдена'}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{task.Title}</h2>
                <p className="text-gray-700 mb-4">{task.Description}</p>
                <p className="text-sm text-gray-500 mb-2">Категория: {task.Category}</p>
                <p className="text-sm text-gray-500 mb-6">Статус: {task.Status}</p>
                <div className="flex space-x-4">
                    <Link
                        to={`/edit-task/${task.ID}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Редактировать
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
