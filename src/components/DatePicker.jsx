import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos predeterminados de react-datepicker
import { es } from 'date-fns/locale'; // Importa la localización en español

const DateInput = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange} // Llama a onDateChange sin formatear la fecha aquí
        dateFormat="MMMM d, yyyy" // Puedes cambiar el formato aquí si lo necesitas
        locale={es} // Aplica la localización en español
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-5000"
        required
      />
    </div>
  );
};

export default DateInput;
