import React from 'react';
import TaskList from "../../components/TaskList/TaskList.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Управление задачами</h1>
            <TaskList />
        </div>
    );
};

export default Home;
