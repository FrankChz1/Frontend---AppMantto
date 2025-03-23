// CardView.jsx

import reportesIcon from '../assets/reportesicon.png';

export default function CardView({ card }) {
  const avance = card.avance ?? 0;

  // Función para asignar color según el porcentaje de avance
  const getColorForAvance = (valor) => {
    if (valor <= 20) return 'red';      // 0% a 20% en rojo
    if (valor < 100) return '#c8b506';    // 21% a 99% en amarillo
    if (valor === 100) return 'green';    // 100% en verde
    return 'gray';
  };

  // Trunca el título si supera los 23 caracteres
  const truncatedTitulo =
    card.descripcion && card.descripcion.length > 41
      ? card.descripcion.slice(0, 41) + '...'
      : card.descripcion || 'Sin Titulo';

  return (
    <div
      className="
        w-full bg-white
        p-2 sm:p-3 md:p-4
        rounded-lg shadow-md
        flex items-start
        hover:bg-orange-50
        transition-colors
        duration-200
        cursor-pointer
        text-[10px] sm:text-xs md:text-sm
      "
    >
      {/* Ícono a la izquierda */}
      <img
        src={reportesIcon}
        alt="Report Icon"
        className="w-8 h-8 object-cover rounded mr-2 sm:mr-3 md:mr-4"
      />

      {/* Contenedor principal de texto */}
      <div className="flex-1">
        {/* Fila 1: TITULO (truncado) */}
        <div className="flex items-center w-full mb-1">
          <h3 className="font-semibold">
            {truncatedTitulo}
          </h3>
        </div>
        {/* Fila 1.2: Autor */}
        <div className="flex items-center w-full mb-1 text-xs">
          <h3 className="font-bold text-gray-600">
            {card.orden || 'Sin Orden'}
          </h3>
        </div>
        {/* Fila 1.3: Actividad y aviso */}
        <div className="flex justify-between items-center w-full mb-1">
          <h3 className="italic">
            {card.equipo|| 'null'}
          </h3>
          
        </div>
        {/* Fila 2: Área y Disciplina */}
        <div className="flex justify-between items-center w-full text-xs">
          <span className="mr-2">
            {card.proceso|| 'Sin Area'}
          </span>
          <span>
            {card.disciplina || 'Disciplina'}
          </span>
        </div>
        {/* Fila 3: Avance (izquierda) y Fecha/Hora (derecha) */}
        <div className="flex justify-between items-center w-full">
          {/* Avance con color dinámico */}
          <p
            className="font-bold mr-2"
            style={{ color: getColorForAvance(avance) }}
          >
            Avance: {avance}%
          </p>
          {/* Fecha y hora */}
          <p className="text-gray-600 whitespace-nowrap">

            {card.duracion || 'duracion'} h
          </p>
        </div>
      </div>
    </div>
  );
}
