import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../service/axios';

interface Task {
    ID: number;
    Title: string;
    Description: string;
    Category: string;
    Status: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('/tasks');
                console.log('Response data:', response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Ошибка при загрузке задач');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (tasks.length === 0) {
        return <div>Нет задач для отображения</div>;
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <div key={task.ID} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">{task.Title}</h3>
                    <p className="text-gray-600 mb-2">{task.Description}</p>
                    <p className="text-sm text-gray-500 mb-4">Категория: {task.Category}</p>
                    <p className="text-sm text-gray-500 mb-4">Статус: {task.Status}</p>
                    <div className="flex justify-between">
                        <Link
                            to={`/tasks/${task.ID}`}
                            className="text-blue-500 hover:underline"
                        >
                            Подробнее
                        </Link>
                        <Link
                            to={`/edit-task/${task.ID}`}
                            className="text-green-500 hover:underline"
                        >
                            Редактировать
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
