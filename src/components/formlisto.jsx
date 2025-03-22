import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import BasicSelect from './Selector';
import ColorSlider from './Slider';

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
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    if (archivo) {
      formData.append('archivo', archivo);
    }

    try {
      const response = await axios.post('/cargarform', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Reporte guardado con éxito');
      console.log('Respuesta del servidor:', response.data);
      navigate('/perfil');
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-4 bg-gray-100">
      {/* Contenedor del formulario */}
      <div className="w-full h-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Selector de Actividad */}
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

          {/* Otros campos del formulario... */}

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
              onChange={(e) => setArchivo(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Botón para guardar */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Guardar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
