import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../../service/axios.ts";

interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
}

const TaskDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axiosInstance.get(`/tasks/${id}`);
            setTask(response.data);
        };
        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Категория: {task.category}</p>
            <p>Статус: {task.status}</p>
        </div>
    );
};

export default TaskDetail;
