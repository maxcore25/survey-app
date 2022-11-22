import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SingIn'
import SignUp from './pages/auth/SingUp';
import Student from './pages/student';
import ProtectedRoute from './components/elements/auth/ProtectedRoute';


function App() {
    return (
        <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route
                path="/teacher"
                element={
                    <ProtectedRoute>
                        <SignIn />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student"
                element={
                    <ProtectedRoute>
                        <Student />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
