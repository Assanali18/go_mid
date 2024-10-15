import React from 'react';
import TaskForm from "../../components/TaskForm/TaskFrom.tsx";

const AddTask: React.FC = () => {
    return (
        <div>
            <h1>Добавить задачу</h1>
            <TaskForm />
        </div>
    );
};

export default AddTask;
