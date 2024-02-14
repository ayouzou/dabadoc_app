import React, { useState } from 'react';

const FilterQuestion: React.FC<{ onFilter: (filterText: string) => void }> = ({ onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filterText);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className=' '>
        <input
          type="text"
          placeholder="Enter city or street"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mr-2"
        />
        <button type="submit" className="bg-black m-2 w-full text-white py-2 px-4 rounded hover:bg-zinc-600 duration-1000 ">
          Apply Filter
        </button>
      </form>
    </div>
  );
};

export default FilterQuestion;
