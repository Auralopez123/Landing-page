import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ConfirmEmail from './components/ConfirmEmail';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/dashboard/About';
import Contact from './components/dashboard/Contact';
import UserProfile from './components/UserProfile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="perfil" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}



