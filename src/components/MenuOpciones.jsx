import React, { useState } from 'react';
import { downloadReportExcel } from '../services/api';
import {
  FileEditIcon,
  GalleryVerticalIcon,
  BarChartIcon,
  SettingsIcon,
  AlertTriangleIcon,
  FileDown,
  XIcon,
  AlignLeftIcon,
  LogOutIcon,
  Settings2Icon,
  ChevronsLeftRightIcon,
  InfoIcon, // Importamos el ícono de cerrar
} from 'lucide-react';

export default function MenuOpciones({ onSelect }) {
  // Estados para la info del usuario
  const nombres = localStorage.getItem('Nombres');
  const empresa = localStorage.getItem('Empresa');
  const especialidad = localStorage.getItem('Especialidad');
  const codigo = localStorage.getItem('Codigo');

  // Estado local para manejar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función que abre el modal de descargas
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función que cierra el modal de descargas
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center min-h-[90vh] w-full bg-gray-100 py-4">
      <div className="bg-white p-6 shadow-md rounded-lg w-full sm:w-1/2 mx-auto">
        
        {/* Información del perfil */}
        <div className="flex items-center w-full mb-6">
          {/* Imagen del perfil */}
          <div className="flex-shrink-0">
            <img
              src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=yqhDz48CzADqRw&pid=ImgRaw&r=0"
              alt="Perfil"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Información del usuario */}
          <div className="ml-4 flex-grow">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {nombres}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p className="text-sm text-gray-600">DNI: {codigo}</p>
              <p className="text-sm text-gray-600">Código: {codigo}</p>
              <p className="text-sm text-gray-600">Empresa: {empresa}</p>
              <p className="text-sm text-gray-600">Disciplina: {especialidad}</p>
            </div>
          </div>
        </div>

        {/* Opciones del menú */}
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Opciones
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <button
            onClick={() => onSelect('galeria')}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition duration-200"
          >
            <FileEditIcon className="mr-3" /> Reporte de Actividades
          </button>

          <button
            onClick={() => onSelect('galeria')}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition duration-200"
          >
            <GalleryVerticalIcon className="mr-3" /> Visualizar Reportes
          </button>

          {/* Botón que abre el modal de descarga */}
          <button
            onClick={() => {
              handleOpenModal(); // Abrimos el modal
            }}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition duration-200"
          >
            <FileDown className="mr-3" /> Descargar Reportes
          </button>

          <button
            onClick={() => onSelect('informacion_data')}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition duration-200"
          >
            <InfoIcon className="mr-3" /> Instrucciones e Información
          </button>

          <button
            onClick={() => onSelect('dashboard')}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition duration-200"
          >
            <SettingsIcon className="mr-3" /> Configuración
          </button>

          <button
            onClick={() => onSelect('salir')}
            className="flex items-center justify-start px-4 py-3 font-medium text-gray-700 bg-indigo-100 rounded-md hover:bg-red-200 transition duration-200"
          >
            <LogOutIcon className="mr-3" /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* MODAL de descargas (solo se ve si isModalOpen === true)          */}
      {/* ---------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Contenedor del contenido del modal */}
          <div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 relative shadow-lg p-6 rounded">
            {/* Botón Cerrar (esquina superior derecha) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XIcon size={24} />
            </button>

            {/* Título del modal */}
            <h2 className="text-xl font-bold mb-4 text-center">
              Descargar Reportes
            </h2>

            {/* Contenido principal del modal */}
            <div className="flex flex-col gap-4">
              <button onClick={() => downloadReportExcel()}
                // Aquí podrías enlazar tu lógica de descarga
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Reportes de trabajos
              </button>
              <button
                // Aquí podrías enlazar tu lógica de descarga
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Reportes de forzamiento
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Fin del modal */}
    </div>
  );
}
