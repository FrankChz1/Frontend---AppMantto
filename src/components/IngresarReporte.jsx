import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BasicSelect from './Selector';
import ColorSlider from './Slider';
import axios from 'axios';  // Asegúrate de importar axios
import { XIcon } from 'lucide-react';  // Importamos el icono de Lucide

export default function IngresarReporte() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [actividad, setActividad] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [turno, setTurno] = useState('');
  const [aviso, setAviso] = useState('');
  const [temperature, setTemperature] = useState(30);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [equipo, setEquipo] = useState('');
  const [componente, setComponente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [material, setMaterial] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar el botón
  // Obtener el nombre del localStorage
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


    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('area', area);
    formData.append('actividad', actividad);
    formData.append('disciplina', disciplina);
    formData.append('turno', turno);
    formData.append('equipo', equipo);
    formData.append('componente', componente);
    formData.append('descripcion', descripcion);
    formData.append('temperature', temperature);
    formData.append('aviso', aviso);
    formData.append('material', material);
    formData.append('fechareporte', new Date().toISOString());

    try {
      const response = await axios.post('/api/cargarform', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Reporte guardado con éxito');
      console.log('Respuesta del servidor:', response.data);
      navigate('/perfil');
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
        {/* Botón para cerrar el formulario */}{/* Icono de "volver atrás" en la parte superior y pegado a la izquierda */}

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
          
        
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete='off'>
          {/* Título dentro del formulario */}

          <h2 className="text-xl md:text-3xl font-bold py-4 px-4 text-center text-gray-800 bg-white shadow-sm mb-6">
            Ingresar Reporte
          </h2>

          {/* Campo para el título */}
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

          {/* Selector de Área */}
          <div>
            <BasicSelect
              label="Área"
              id="area-select"
              options={[
                { value: "Flotacion Bulk", label: "Flotacion Bulk" },
                { value: "Flotacion Zinc", label: "Flotacion Zinc" },
                { value: "Flotacion Pb Cu", label: "Flotacion Pb Cu" },
                { value: "Molienda Metso 1", label: "Molienda Metso 1" },
                { value: "Molienda Metso 2", label: "Molienda Metso 2" },
                { value: "Molienda Marcy", label: "Molienda Marcy" },
                { value: "Molienda Comesa", label: "Molienda Comesa" },
                { value: "Espesamiento", label: "Espesamiento" },
                { value: "Reactivos", label: "Reactivos" },
                { value: "Otros", label: "Otros" }
              ]}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>


          {/* Selector de Actividad*/}
          <div>
            <BasicSelect
              label="Actividad"
              id="actividad-select"
              options={[
                { value: "Preventivo", label: "Preventivo" },
                { value: "Correctivo", label: "Correctivo" },
                { value: "Otros", label: "Otros" }
              ]}
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>

          {/* Selector de Disciplina*/}
          <div>
            <BasicSelect
              label="Disciplina"
              id="disciplina-select"
              options={[
                { value: "Electricidad", label: "Electricidad" },
                { value: "Instrumentacion", label: "Instrumentacion" },
                { value: "Automatizacion", label: "Automatizacion" },
                { value: "Otros", label: "Otros" }
              ]}
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Seleccionar"
            />
          </div>

          {/* Selector de Turno*/}
          <div>
            <BasicSelect
              label="Turno"
              id="turno-select"
              options={[
                { value: "Dia", label: "Dia" },
                { value: "Noche", label: "Noche" }
              ]}
              value={turno}
              onChange={(e) => setTurno(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Selecciona un área"
            />
          </div>

          {/* TAG EQUIPO */}
          <div>
            <label
              htmlFor="Equipo"
              className="block text-gray-700 font-medium mb-2"
            >
              Equipo
            </label>
            <input
              id="Equipo"
              type="text"
              placeholder="Ingresa tag del equipo M-xxxxx"
              value={equipo}
              onChange={(e) => setEquipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
            />
          </div>

          {/* COMPONENTE*/}
          <div>
            <label
              htmlFor="Componente"
              className="block text-gray-700 font-medium mb-2"
            >
              Componente
            </label>
            <input
              id="Componente"
              type="text"
              placeholder="Ingresa componente: Motor, Bomba, Válvula, etc."
              value={componente}
              onChange={(e) => setComponente(e.target.value)}

              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
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



          {/* Control de Temperatura */}
          <div>
            <ColorSlider
              label="Avance de la tarea"
              min={0}
              max={100}
              defaultValue={temperature}
              color="#FF5000"
              unit="%"
              onValueChange={(value) => setTemperature(value)}
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

          {/* Selector de Aviso*/}
          <div>
            <BasicSelect
              label="Necesita Aviso?"
              id="aviso-select"
              options={[
                { value: "Si", label: "Si" },
                { value: "No", label: "No" }
              ]}
              value={aviso}
              onChange={(e) => setAviso(e.target.value)}
              className="w-full"
              labelClassName="block text-gray-700 font-medium mb-2"
              selectClassName="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Selecciona un área"
            />
          </div>

          {/* Material Solicitado*/}
          <div>
            <label
              htmlFor="Materialsolicitado"
              className="block text-gray-700 font-medium mb-2"
            >
              Material solicitado
            </label>
            <input
              id="Materialsolicitado"
              type="text"
              placeholder="Ingresa material y codigo sap"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoComplete="off"
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
