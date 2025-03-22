import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirigir a la página de login
    return <Navigate to="/" replace />;
  }

  // Si hay token, se puede acceder a la ruta protegida
  return children;
};

export default ProtectedRoute;
