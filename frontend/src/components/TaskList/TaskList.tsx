import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../../service/axios.ts";

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

    console.log('Tasks during render:', tasks);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Список задач</h2>
            <Link to="/add-task">Добавить новую задачу</Link>
            <ul>
                {tasks.map(task => (
                    <li key={task.ID}>
                        <Link to={`/tasks/${task.ID}`}>{task.Title}</Link> - {task.Status}
                        <Link to={`/edit-task/${task.ID}`}>Редактировать</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
