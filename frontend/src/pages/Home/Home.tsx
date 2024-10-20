import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../../components/TaskList/TaskList';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Управление задачами</h1>
                <Link to="/add-task">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Добавить задачу
                    </button>
                </Link>
            </div>
            <TaskList />
        </div>
    );
};

export default Home;
