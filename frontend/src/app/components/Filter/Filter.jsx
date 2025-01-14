"use client";

import { useState } from "react";

export default function Filter({ title, content }) {
  const [active, setActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  return (
    <div className="accordion-item bg-white shadow-lg rounded-lg mb-4 w-full">
      <div
        className="accordion-title flex justify-between items-center cursor-pointer p-4 hover:bg-gray-200 transition-all"
        onClick={() => setActive(!active)}
      >
        <div className="font-bold text-sm text-gray-800">{title}</div>
        <div className="text-2xl text-gray-500">{active ? "-" : "+"}</div>
      </div>

      <div
        className={`accordion-content transition-all duration-700 ease-out overflow-hidden ${
          active ? "max-h-screen p-4" : "max-h-0"
        }`}
      >
        {content.map(({ filter }, index) => (
          <div key={`content-${index}`}>
            {filter.map((item, subIndex) => (
              <p
                className="cursor-pointer flex justify-between items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                key={`${title}-${index}-${subIndex}`}
              >
                <label
                  htmlFor={`${title}-${index}-${subIndex}`}
                  className="text-sm text-gray-700"
                >
                  {item}
                </label>
                <input
                  type="radio"
                  name={title}
                  id={`${title}-${index}-${subIndex}`}
                  value={item}
                  checked={selectedFilter === item}
                  onChange={() => handleFilterChange(item)}
                  className="text-blue-600 focus:ring-blue-500"
                />
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
    
  );
}
