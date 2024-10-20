import React from 'react';
import TaskForm from "../../components/TaskForm/TaskFrom.tsx";

const AddTask: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Добавить задачу</h2>
            <TaskForm />
        </div>
    );
};

export default AddTask;
