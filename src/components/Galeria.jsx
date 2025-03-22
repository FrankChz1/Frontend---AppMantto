import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchReports } from '../services/api';
import CardView from './CardView';
import { PlusIcon, ArrowLeftIcon } from 'lucide-react';
import CardModal from './CardModal'; // Importamos el componente CardModal

export default function Galeria() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastDocId, setLastDocId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReports();
        setCards(data.data || []);
        setLastDocId(data.last_doc_id || null);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleAddReport = () => {
    navigate('/perfil/formulario');
  };

  const handleGoBack = () => {
    navigate('/perfil');
  };

  const handleViewMore = async () => {
    setIsLoadingMore(true);
    try {
      const data = await fetchReports(10, lastDocId);
      setCards((prevCards) => [...prevCards, ...data.data]);
      setLastDocId(data.last_doc_id || null);
    } catch (error) {
      console.error('Error al cargar más reportes:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'ELECTRICIDAD', label: 'ELE' },
    { value: 'INSTRUMENTACION', label: 'INS' },
    { value: 'none', label: 'MIOS' }
  ];

  const filteredCards = filter === 'all' ? cards : cards.filter(card => card.DISCIPLINA === filter);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  const handleEditReport = () => {
    navigate(`/perfil/formulario/${selectedCard.id}`);
    closeModal();
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-5xl  bg-white rounded-lg shadow-md min-h-screen relative">
        {/* Header con iconos y opciones de filtro */}
        <div className="sticky top-0 z-10 bg-white shadow-sm py-4">
          <div className="flex justify-between items-center px-4">
            <button onClick={handleGoBack} className="text-gray-700 hover:text-gray-900 transition-colors">
              <ArrowLeftIcon size={24} />
            </button>
            <div className="flex justify-center space-x-4">
              {filterOptions.map((option) => (
                <label key={option.value} className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out border ${filter === option.value ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                  <input type="radio" name="filter" value={option.value} checked={filter === option.value} onChange={() => handleFilterChange(option.value)} className="hidden" />
                  {option.label}
                </label>
              ))}
            </div>
            <button onClick={handleAddReport} className="text-gray-700 hover:text-gray-900 transition-colors">
              <PlusIcon size={24} />
            </button>
          </div>
        </div>

        {/* Galería de cards */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            filteredCards.map((card, index) => (
              <div key={index} onClick={() => openModal(card)}>
                <CardView card={card} />
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        <CardModal 
          selectedCard={selectedCard} 
          modalVisible={modalVisible} 
          closeModal={closeModal} 
          handleEditReport={handleEditReport} 
        />

        {/* Botón flotante para cargar más */}
        <div className="flex justify-center items-center">
          {isLoadingMore ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          ) : (
            <button onClick={handleViewMore} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#ff5000] text-white rounded-full px-8 py-3 shadow-lg hover:bg-orange-600 transition-colors">
              Ver Más
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
