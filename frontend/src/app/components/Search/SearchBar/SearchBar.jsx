import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ExpandableSearch = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(true);
    };

    const handleBlur = () => {
        setIsExpanded(false);
    };

    return (
        <div className="flex justify-center items-center w-full">

            <div
                className={`flex items-center bg-black rounded-lg  h-12 overflow-hidden transition-all duration-500 ease-in ${
                    isExpanded ? "w-full" : "w-12"
                }`}
            >

                <button
                    className="p-4 focus:outline-none "
                    onClick={handleToggle}

                >
                    <FaSearch className="text-white" />
                </button>


                {isExpanded && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 text-white text-sm bg-transparent outline-none"
                        onBlur={handleBlur}
                        autoFocus
                    />
                )}
            </div>
        </div>
    );
};

export default ExpandableSearch;
