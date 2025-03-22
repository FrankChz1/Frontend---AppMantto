import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import BasicSelect from './Selector';
import { procesos, duracion } from './procesoData';  // Importando las opciones
import DateInput from './DatePicker';
import { XIcon } from 'lucide-react';  // Importamos el icono de Lucide
import axios from 'axios';  // Asegúrate de importar axios
import { format } from 'date-fns'; // Asegúrate de importar la función de formato de date-fns
export default function HistorialForzamiento() {
  const navigate = useNavigate();
  const [gerencia, setGerencia] = useState('');
  const [proceso, setProceso] = useState('');
  const [vduracion, setDuracion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha_Reporte, setFechaReporte] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar el botón
  const nombres = localStorage.getItem('Nombres');

  // Usar useEffect para establecer el autor al valor de nombres si está disponible
  useEffect(() => {
    if (nombres) {
      setAutor(nombres); // Establece el valor de autor con el nombre de localStorage
    }
  }, [nombres]); // Solo se ejecuta cuando nombres cambia  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Deshabilitar el botón al iniciar el envío

    // Crear un objeto FormData para enviar los datos
    // Formatear la fecha de reporte al formato DD/MM/YYYY HH:mm
    const formattedFechaReporte = format(fecha_Reporte, 'dd/MM/yyyy HH:mm'); // Formato: DD/MM/YYYY HH:mm
  
    const FormDataForzamiento = new FormData();
    FormDataForzamiento.append('titulo', titulo);
    FormDataForzamiento.append('autor', autor);
    FormDataForzamiento.append('solicitante', solicitante);
    FormDataForzamiento.append('gerencia', gerencia);
    FormDataForzamiento.append('proceso', proceso);
    FormDataForzamiento.append('duracion', vduracion);
    FormDataForzamiento.append('descripcion', descripcion);
    FormDataForzamiento.append('fechareporte', new Date().toISOString());
    FormDataForzamiento.append('fechaforzamiento', formattedFechaReporte);

    try {
      // Enviar los datos usando axios
      const response = await axios.post('/api/cargarforza', FormDataForzamiento, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Reporte guardado con éxito');
      console.log('Respuesta del servidor:', response.data);
      navigate('/perfil');  // Redirigir a otra página después de guardar el reporte
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
    } finally {
      setIsLoading(false);  // Volver a habilitar el botón después de completar el envío
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-4 bg-gray-100">
      {/* Contenedor del formulario */}
      <div className="relative w-full h-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 overflow-y-auto">

        <div className="flex items-center justify-between p-2">
            <button
              onClick={() => navigate('/perfil')}
              className="absolute left-4 bg-red-600 text-white p-2 rounded 
                        hover:bg-red-700 transition-colors"
              aria-label="Cerrar y volver al perfil"
            >
              <XIcon size={24} />
            </button>
        </div>



        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo para el título */}
          <h1 className="text-xl md:text-3xl font-bold py-4 px-4 text-center text-gray-800 bg-white shadow-sm mb-6">
              Reporte de Forzamiento
          </h1>
          <div>
            <label
              htmlFor="titulo"
              className="block text-gray-700 font-medium mb-2"
            >
              Título del Reporte
            </label>
            <input
              id="titulo"
              type="text"
              placeholder="Escribe el título del reporte"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
            />
          </div>
          {/* Campo para la fecha del reporte */}
          <div>
            <label
              htmlFor="fecha_reporte"
              className="block text-gray-700 font-medium mb-2"
            >
              Fecha de Reporte
            </label>
            <DateInput
              selectedDate={fecha_Reporte}  // Pasa la fecha seleccionada
              onDateChange={setFechaReporte}  // Función para actualizar la fecha
            />
          </div>


          {/* Campo para el autor del reporte */}
          <div>
            <label
              htmlFor="Autor"
              className="block text-gray-700 font-medium mb-2"
            >
              Autor del Reporte
            </label>
            <input
              id="Autor"
              type="text"
              placeholder="Autor del reporte"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
            />
          </div>

          {/* Campo para el autor del reporte */}
          <div>
            <label
              htmlFor="Solicitante"
              className="block text-gray-700 font-medium mb-2"
            >
              Nombre del solicitante
            </label>
            <input
              id="Solicitante"
              type="text"
              placeholder="Frank Chuquispuma"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
            />
          </div>




          {/* Selector de Gerencia */}
          <div>
            <BasicSelect
              label="Gerencia solicitante"
              id="area-select"
              options={[{value: "Mantenimiento", label: "Mantenimiento"},
              {value: "Operaciones", label: "Operaciones"},
              {value: "Seguridad", label: "Seguridad"},
              {value: "Otros", label: "Otros"}]}
              value={gerencia}
              onChange={(e) => setGerencia(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>
          {/* Selector de Proceso */}
          <div>
            <BasicSelect
              label="Proceso"
              id="proceso-select"
              options={procesos}
              value={proceso}
              onChange={(e) => setProceso(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>

          {/* Selector de Duracion*/}
          <div>
            <BasicSelect
              label="Duracion"
              id="proceso-select"
              options={duracion}
              value={vduracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>   



         

          {/* Campo para la descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block text-gray-700 font-medium mb-2"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows="4"
              placeholder="Escribe la descripción detallada del reporte"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
            />
          </div>

          {/* Campo para adjuntar archivo */}
          <div>
            <label
              htmlFor="archivo"
              className="block text-gray-700 font-medium mb-2"
            >
              Adjuntar Archivo
            </label>
            <input
              id="archivo"
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Botón para guardar */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading} // Deshabilitar el botón mientras se está enviando el reporte
              className={`w-full text-white py-3 sm:py-2 rounded-lg transition duration-200 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando Reporte...
                </span>
              ) : (
                'Guardar Reporte'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
