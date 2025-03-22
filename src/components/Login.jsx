import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
    
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const validateForm = () => {
        let isValid = true;
        let errorMessage = '';

        if (!dni.trim()) {
            errorMessage += 'El DNI es requerido.\n';
            isValid = false;
        } else if (dni.trim().length < 8) {
            errorMessage += 'El DNI debe tener al menos 8 caracteres.\n';
            isValid = false;
        }

        if (!password) {
            errorMessage += 'La contraseña es requerida.\n';
            isValid = false;
        }

        if (errorMessage) {
            setError(errorMessage);
        } else {
            setError('');
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const data = await login(dni.trim(), password);

            if (data && data.access_token) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('Nombres', data.nombres);
                localStorage.setItem('Empresa', data.empresa);
                localStorage.setItem('Especialidad', data.especialidad);
                localStorage.setItem('Codigo', data.codigo);
                navigate('/perfil');
            } else {
                if (data && data.msg) {
                    setError(data.msg);
                } else if (data) {
                    setError('Error en la respuesta del servidor. Faltan datos.');
                } else {
                    setError('Error en la respuesta del servidor o no hay respuesta');
                }
            }
        } catch (error) {
            let errorMessage = 'Error al iniciar sesión';
            if (error.response && error.response.data && error.response.data.msg) {
                errorMessage = error.response.data.msg;
            } else if (error.message) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            setError(errorMessage);
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDniChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setDni(value);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-2">
            <div className="w-full max-w-md sm:max-w-sm bg-white rounded-lg shadow-lg p-8 sm:p-6">
                <h1 className="text-2xl sm:text-xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
                {error && (
                    <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="dni">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            placeholder="Ingrese su DNI (8 dígitos)"
                            value={dni}
                            onChange={handleDniChange}
                            maxLength="8"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none sm:py-1"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none sm:py-1"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white py-3 sm:py-2 rounded-lg transition duration-200 ${
                            isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </span>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;