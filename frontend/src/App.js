import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SingIn';
import SignUp from './pages/auth/SingUp';
import Home from './pages/home';
import ProtectedRoute from './components/elements/auth/ProtectedRoute';
import Survey from './pages/survey';
import Panel from './pages/panel';
import { MainContextProvider } from './context/MainContextProvider';

function App() {
  return (
    <MainContextProvider>
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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/survey'
          element={
            <ProtectedRoute>
              <Survey />
            </ProtectedRoute>
          }
        />
        <Route
          path='/panel'
          element={
            <ProtectedRoute>
              <Panel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainContextProvider>
  );
}

export default App;
