import { Link } from 'react-router-dom';

export default function NotFounds() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-8">
        Lo sentimos, no pudimos encontrar la página que buscas.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-200"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
