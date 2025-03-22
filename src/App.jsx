import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Perfil from './components/Perfil';
import NotFounds from './components/NotFounds';
import Slider from './components/Slider';
import Galeria from './components/Galeria';
import ProtectedRoute from './components/ProtectedRoute'; // Importa ProtectedRoute
import PublicRoute from './components/PublicRoute'; // Importa PublicRoute

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Si el usuario va a "/", redirigirlo a "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Ruta para login: solo si NO tiene token */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Rutas públicas protegidas por token */}
        <Route 
          path="/galeria" 
          element={
            <ProtectedRoute>
              <Galeria />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/slider" element={<Slider />} />

        {/* Rutas protegidas */}
        <Route 
          path="/perfil/*" 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />

        {/* Página 404 */}
        <Route path="*" element={<NotFounds />} />
      </Routes>
    </Router>
  );
}
