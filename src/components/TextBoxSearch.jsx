import { Search } from 'lucide-react';

const TextboxSearch = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-md w-full">
      <Search className="text-gray-600" size={20} />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full p-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
      />
    </div>
  );
};

export default TextboxSearch;
