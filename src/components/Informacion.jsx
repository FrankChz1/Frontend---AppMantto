import React from 'react';
import { XIcon } from 'lucide-react';
import './InformacionDatas.css'; // Importa el archivo CSS

export default function InformacionDatas() {
  return (
    <div className="flex items-center justify-center py-4 bg-gray-900 h-[90vh]">
      <div className="relative w-full h-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-4 md:p-6 overflow-y-auto">
        <div className="flex items-center justify-between p-2">
          <button
            onClick={() => window.history.back()}
            className="absolute left-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
            aria-label="Cerrar y volver al perfil"
          >
            <XIcon size={24} />
          </button>
        </div>

        <form className="space-y-5">
          <h1 className="text-xl md:text-3xl font-bold py-4 px-4 text-center text-white bg-gray-700 shadow-sm my-6">
            Instrucciones e Información
          </h1>
          <div className='px-6'>
            <p className='fira-code-font text-white'>
              A continuación se detallan las instrucciones para el uso adecuado de la aplicación:
            </p>
            <ul className="space-y-4 text-white">
              <li>1. Al obtener la aplicación, deberá solicitar las credenciales de acceso al gestor de reportes.</li>
              <li>2. Una vez tenga las credenciales, inicie sesión y revise los datos de su cuenta, como nombre, especialidad, empresa y DNI. Estos datos estarán vinculados a su reporte de actividad.</li>
              <li>3. En el menú de opciones, podrá acceder a la opción <strong className="text-indigo-400">Reporte de Actividades</strong>, donde encontrará una galería de actividades asignadas a su empresa. Deberá reportar el avance y dejar un comentario cada vez que sea solicitado.</li>
              <li>4. Cada reporte estará vinculado a su información, y el avance reportado se fijará como valor inicial para el próximo reporte. Los comentarios no siempre son obligatorios.</li>
              <li>5. En la parte superior derecha de la galería de actividades, encontrará una opción para insertar el código de orden de trabajo y hacer un reporte directo, en caso de que la orden que desea reportar no se encuentre en su lista de actividades.</li>
              <li>6. Además, está disponible la opción de visualizar reportes, donde podrá consultar el historial de reportes realizados. Se recomienda indicar si la actividad quedó suspendida si no se alcanzó el 100% del avance.</li>
              <li>7. Se recomienda enviar reportes precisos que reflejen el avance real de cada actividad.</li>
            </ul>

            <footer className="py-6 bg-gray-800">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Mantenimiento App</span> fue desarrollada por <strong>Frank Chuquispuma</strong> para su uso exclusivo en el área de mantenimiento durante las paradas de planta. 
                  Esta herramienta está diseñada para generar reportes en tiempo real sobre las actividades de mantenimiento, contribuyendo a la eficiencia operativa.
                  <br /><br />
                  La aplicación debe utilizarse exclusivamente dentro del ámbito del área de mantenimiento y durante las paradas de planta. No se recomienda su uso fuera de este contexto. 
                  Los desarrolladores no se hacen responsables de cualquier uso indebido o problemas derivados de su implementación fuera del propósito previsto.
                  <br /><br />
                  <span className="font-semibold text-white">© 2025 Frank Chuquispuma. Todos los derechos reservados.</span>
                </p>
              </div>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
}
