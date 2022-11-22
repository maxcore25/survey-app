import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SingIn';
import SignUp from './pages/auth/SingUp';
import User from './pages/user';
import ProtectedRoute from './components/elements/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<SignIn />} />
      <Route exact path='/register' element={<SignUp />} />
      <Route
        path='/teacher'
        element={
          <ProtectedRoute>
            <SignIn />
          </ProtectedRoute>
        }
      />
      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
