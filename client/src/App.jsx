import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import CreateNote from './pages/Notes/CreateNote';
import EditNote from './pages/Notes/EditNote';
import ViewNote from './pages/Notes/ViewNote';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      }>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<Homepage />} />
        <Route path="/notes/new" element={<CreateNote />} />
        <Route path="/notes/:id" element={<ViewNote />} />
        <Route path="/notes/:id/edit" element={<EditNote />} />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
