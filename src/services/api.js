import axios from 'axios';

// Crear una única instancia de axios con configuración global
const axiosInstance = axios.create({
  baseURL: '/', // Definir la base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Función de login (sin cambios)
export const login = async (dni, password) => {
  try {
    const response = await axiosInstance.post('/api/login', {
      Dni: dni,
      password: password
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error("Request Error:", error.request);
      throw new Error('No se pudo conectar con el servidor');
    } else {
      console.error("Setup Error:", error.message);
      throw new Error('Error al procesar la solicitud');
    }
  }
};

// ---------------------
// Funciones para Reportes
// ---------------------

// URL relativa para los reportes
const REPORTS_URL = '/api/ordenes_parada';

// Función para obtener los reportes sin paginación
export const fetchReports = async () => {
  try {
    const response = await axiosInstance.get(REPORTS_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los reportes:', error);
    throw error;
  }
};



// Función para descargar el reporte Excel
export const downloadReportExcel = async () => {
  try {
    // Usamos la instancia axiosInstance para mantener consistencia
    const response = await axiosInstance.get('api/reports/excel', {
      responseType: 'blob', // Indicamos que la respuesta será un archivo binario
    });

    // Crear un enlace temporal para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reportes.xlsx'); // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();

    // Limpiar después de la descarga
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Hubo un error al intentar descargar el reporte:', error);
  }
};
