// PublicRoute.jsx
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Si hay token, redirige a /perfil
  if (token) {
    return <Navigate to="/perfil" replace />;
  }

  // Si no hay token, renderiza normalmente
  return children;
};

export default PublicRoute;
