import { Routes, Route, useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import Header from './Header';
import MenuOpciones from './MenuOpciones';
import IngresarReporte from './IngresarReporte';
import Galeria from './Galeria';
import HistorialForzamiento from './HistorialForza';
import InformacionDatas from './Informacion';

export default function Perfil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borra TODOS los datos almacenados en localStorage
    localStorage.clear();
    // Redirige al usuario a la página de inicio (o donde necesites)
    navigate('/');
  };

  // Crear un componente que ejecute handleLogout
  const Logout = () => {
    useEffect(() => {
      handleLogout(); // Llamar a handleLogout después del renderizado
    }, []);  // El array vacío asegura que solo se ejecute una vez

    return null; // No renderiza nada, solo ejecuta el logout y redirige
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header fijo */}
      <Header />

      {/* Contenedor principal */}
      <main className="mx-auto flex-grow w-full">
        <Routes>
          {/* Ruta inicial del perfil */}
          <Route
            path=""
            element={
              <MenuOpciones
                onSelect={(option) => navigate(option)}
              />
            }
          />
          
          {/* Rutas internas */}
          <Route path="formulario" element={<IngresarReporte />} />
          <Route path="informacion_data" element={<InformacionDatas />} />
          <Route path="galeria" element={<Galeria />} />
          
          {/* Ruta para hacer logout */}
          <Route path="salir" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}
