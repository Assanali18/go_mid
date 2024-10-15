import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import AddTask from './pages/AddTask/AddTask';
import EditTask from './pages/EditTask/EditTask';
import TaskDetail from './components/TaskDetail/TaskDetail';
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import PrivateRoute from "./util/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />

                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/add-task" element={
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                } />
                <Route path="/edit-task/:id" element={
                    <PrivateRoute>
                        <EditTask />
                    </PrivateRoute>
                } />
                <Route path="/tasks/:id" element={
                    <PrivateRoute>
                        <TaskDetail />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
