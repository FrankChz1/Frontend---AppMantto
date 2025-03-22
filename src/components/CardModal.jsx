import React, { useState } from 'react';
import { XIcon, EditIcon } from 'lucide-react';

const CardModal = ({
  selectedCard,
  modalVisible,
  closeModal,
  // Función del padre (o API) para guardar los cambios
  handleEditReport: handleExternalEdit,
}) => {
  if (!selectedCard) return null;

  // Controla si estamos en modo edición (true) o solo lectura (false)
  const [isEditing, setIsEditing] = useState(false);

  // Copiamos los datos iniciales del 'selectedCard' para el formulario
  const [formData, setFormData] = useState({ ...selectedCard });

  // Maneja cambios en inputs (tanto texto como slider)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios y cerrar modo edición
  const handleSave = () => {
    handleExternalEdit(formData);
    setIsEditing(false);
  };

  // Cancelar edición y restaurar valores originales
  const handleCancel = () => {
    setFormData({ ...selectedCard });
    setIsEditing(false);
  };

  // Campo de texto editable o lectura
  const renderEditableField = (label, fieldName) => {
    if (!isEditing) {
      // Modo Lectura
      return (
        <p>
          <strong>{label}:</strong> {formData[fieldName] || "No especificado"}
        </p>
      );
    }
    // Modo Edición
    return (
      <label className="block mb-2">
        <strong>{label}:</strong>
        <input
          type="text"
          name={fieldName}
          value={formData[fieldName] || ""}
          onChange={handleChange}
          className="w-full mt-1 p-1 border border-gray-300 rounded"
        />
      </label>
    );
  };

  // Slider para el AVANCE
  const renderAvanceField = () => {
    if (!isEditing) {
      // Lectura
      return (
        <p>
          <strong>AVANCE:</strong> {formData.AVANCE || 0}%
        </p>
      );
    }
    // Edición (slider)
    return (
      <label className="block mb-2">
        <strong>AVANCE:</strong>
        <input
          type="range"
          name="AVANCE"
          min="0"
          max="100"
          value={formData.AVANCE || 0}
          onChange={handleChange}
          className="w-full"
        />
        <span>{formData.AVANCE || 0}%</span>
      </label>
    );
  };

  return (
    modalVisible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 relative shadow-lg">

          {/* Barra Superior con color #ff5000 */}
          <div className="bg-[#ff5000] sticky top-0 w-full flex items-center justify-between p-3 z-10">
            {/* Botón Cerrar */}
            <button onClick={closeModal} className="text-white">
              <XIcon size={24} />
            </button>

            {/* Botón Editar / Guardar / Cancelar */}
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-white">
                <EditIcon size={24} />
              </button>
            ) : (
              <div className="flex space-x-3">
                <button onClick={handleSave} className="text-white font-semibold">
                  Guardar
                </button>
                <button onClick={handleCancel} className="text-white font-semibold">
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Contenido desplazable */}
          <div className="max-h-[80vh] overflow-y-auto p-6 flex flex-col gap-6">

            {/** ------------------------
             *     MODO LECTURA
             * ------------------------*/}
            {!isEditing && (
              <>
                {/* TÍTULO en lectura */}
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                  {formData.TITULO}
                </h2>

                {/* Resto de campos no editables */}
                <div className="text-gray-700 space-y-2">
                  <p>
                    <strong>ACTIVIDAD:</strong> {formData.ACTIVIDAD}
                  </p>
                  <p>
                    <strong>AREA:</strong> {formData.AREA}
                  </p>
                  <p>
                    <strong>AUTOR:</strong> {formData.AUTOR}
                  </p>
                  <p>
                    <strong>DISCIPLINA:</strong> {formData.DISCIPLINA}
                  </p>
                  <p>
                    <strong>EQUIPO:</strong> {formData.EQUIPO}
                  </p>
                  <p>
                    <strong>FECHA DE REPORTE:</strong>{" "}
                    {formData.FECHA_DE_REPORTE
                      ? new Date(formData.FECHA_DE_REPORTE).toLocaleDateString()
                      : "No disponible"}
                  </p>
                  <p>
                    <strong>MODOS DE FALLA:</strong>{" "}
                    {formData.MODO_DE_FALLA || "No especificado"}
                  </p>
                  <p>
                    <strong>NECESITA AVISO:</strong>{" "}
                    {formData.NECESITA_AVISO === "True" ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>TURNO:</strong> {formData.TURNO}
                  </p>

                  {/* Campos que SÍ son editables, pero en lectura */}
                  {renderAvanceField()}
                  <p>
                    <strong>COMENTARIO:</strong>{" "}
                    {formData.COMENTARIO || "No especificado"}
                  </p>
                  <p>
                    <strong>MATERIAL SOLICITADO:</strong>{" "}
                    {formData.MATERIAL_SOL || "No especificado"}
                  </p>
                  <p>
                    <strong>NÚMERO DE AVISO:</strong> {formData.NUM_AVISO || "No especificado"}
                  </p>
                  <p>
                    <strong>ID:</strong> {formData.id || "No especificado"}
                  </p>

                </div>

                {/* Imagen visible sólo en modo lectura */}
                <div>
                  {formData.IMAGEN && formData.IMAGEN !== "" ? (
                    <img
                      src={formData.IMAGEN}
                      alt={formData.TITULO}
                      className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                    />
                  ) : (
                    <img
                      src="https://th.bing.com/th/id/OIP.Os4634Bl5axpeek0bmz6KwHaE7?rs=1&pid=ImgDetMain"
                      alt="Imagen Bing"
                      className="w-full h-auto object-cover rounded-lg shadow-md mt-2"
                    />
                  )}
                </div>
              </>
            )}

            {/** ------------------------
             *     MODO EDICIÓN
             * ------------------------*/}
            {isEditing && (
              <>
                {/* TÍTULO editable */}
                <div>
                  <label className="block text-center mb-2 text-xl font-semibold">
                    Título:
                  </label>
                  <input
                    type="text"
                    name="TITULO"
                    value={formData.TITULO || ""}
                    onChange={handleChange}
                    className="block mx-auto w-3/4 p-1 border border-gray-300 rounded"
                  />
                </div>

                {/* Solamente los campos editables */}
                <div className="text-gray-700 space-y-2">
                  {renderAvanceField()}
                  {renderEditableField("COMENTARIO", "COMENTARIO")}
                  {renderEditableField("MATERIAL SOLICITADO", "MATERIAL_SOL")}
                  {renderEditableField("NÚMERO DE AVISO", "NUM_AVISO")}
                </div>

                {/* Sin imagen en modo edición */}
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CardModal;
