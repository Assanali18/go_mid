import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../service/axios.ts';
import {Task} from "../../models/Task.ts";

const EditTaskForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task>({
        ID: 0,
        Title: '',
        Description: '',
        Category: '',
        Status: 'To Do',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosInstance.get(`/tasks/${id}`);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/tasks/${id}`, task);
            alert('Задача обновлена');
            navigate(`/tasks/${id}`);
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Ошибка при обновлении задачи');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Редактировать задачу</h2>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Название:</label>
                <input
                    type="text"
                    id="title"
                    value={task.Title}
                    onChange={(e) => setTask({...task, Title: e.target.value})}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание:</label>
                <textarea
                    id="description"
                    value={task.Description}
                    onChange={(e) => setTask({...task, Description: e.target.value})}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Категория:</label>
                <input
                    type="text"
                    id="category"
                    value={task.Category}
                    onChange={(e) => setTask({...task, Category: e.target.value})}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Статус:</label>
                <select
                    id="status"
                    value={task.Status}
                    onChange={(e) => setTask({...task, Status: e.target.value})}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Process">In Process</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                    Сохранить изменения
                </button>
            </div>
        </form>
    );
};

export default EditTaskForm;
