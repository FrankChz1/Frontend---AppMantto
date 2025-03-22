import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borra TODOS los datos almacenados en localStorage
    localStorage.clear();
    // Redirige al usuario a la página de inicio (o donde necesites)
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;

