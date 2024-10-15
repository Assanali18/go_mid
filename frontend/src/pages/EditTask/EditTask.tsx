import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from "../../service/axios.ts";

interface Task {
    title: string;
    description: string;
    category: string;
    status: string;
}

const EditTask: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`/tasks/${id}`);
            setTask(response.data);
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
            await axiosInstance.put(`/tasks/${id}`, task);
            navigate('/');
        }
    };

    if (!task) {
        return <div>Загрузка...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактировать задачу</h2>
            <input
                type="text"
                placeholder="Название"
                value={task.title}
                onChange={e => setTask({ ...task, title: e.target.value })}
                required
            />
            <textarea
                placeholder="Описание"
                value={task.description}
                onChange={e => setTask({ ...task, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Категория"
                value={task.category}
                onChange={e => setTask({ ...task, category: e.target.value })}
            />
            <select
                value={task.status}
                onChange={e => setTask({ ...task, status: e.target.value })}
            >
                <option value="To Do">To Do</option>
                <option value="In Process">In Process</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit">Обновить задачу</button>
        </form>
    );
};

export default EditTask;
