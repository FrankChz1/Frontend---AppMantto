import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react"; // Asegúrate de usar solo este icono

const BasicSelect = ({
  label,
  id,
  options,
  value,
  onChange,
  className,
  labelClassName,
  selectClassName,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el desplegable está abierto

  // Maneja el cambio del valor en el select
  const handleSelectChange = (e) => {
    onChange(e);
    setIsOpen(false); // Cierra el desplegable al seleccionar una opción
  };

  return (
    <div className={className}>
      {/* Etiqueta del selector */}
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={handleSelectChange}
          className={`w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${selectClassName} appearance-none`}
          onClick={() => setIsOpen(!isOpen)} // Cambia el estado cuando se hace clic
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Flecha animada (solo esta flecha se muestra) */}
        <ChevronDownIcon
          size={20}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </div>
  );
};

export default BasicSelect;

