import { useState } from 'react';

const RecipeFilter = ({ filters, addFilter, updateFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newFilterName, setNewFilterName] = useState('');
    let count = 0
    const handleFilterNameChange = (index) => (e) => {
        updateFilter(index, e.target.value); // Обновляем имя фильтра
      };

      
    const toggleModal = () => setIsOpen(!isOpen);
  
    const handleAddFilter = () => {
      if (newFilterName) {
        addFilter(newFilterName);
        setNewFilterName('');
        toggleModal();

      }
    };
  
    const handleFilterValueChange = (index) => (e) => {
      updateFilter(index, e.target.value);
    };
    return(
    <div className="relative">
        <div className="group relative">

            <button 
                onClick={toggleModal}
                disabled={filters.length >= 3}  
                className={` bg-nedoorange text-white rounded-xl px-4 py-2 hover:bg-nedoorange/60 ${
                  filters.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                +
            </button>
            <div className="absolute bottom-full mb-2  text-nowrap transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm p-2 rounded">
                {filters.length >= 3 ? "You can't add more than 3 filters" : "You can add recipe filter here!"}
            </div>
        </div>
      


      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Recipes filter</h2>
            <input
              type="text"
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
              placeholder="Insert filter here"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={toggleModal}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-300 transition duration-300">
                Close
              </button>
              <button
                onClick={() => { 
                    //todo add adding logic
                    handleAddFilter()
                    toggleModal();
                }}
                className="bg-nedoorange text-white p-2 rounded hover:bg-nedoorange/40  hover:text-black transition duration-300">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilter;
