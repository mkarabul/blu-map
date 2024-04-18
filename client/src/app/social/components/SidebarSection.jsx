import { useState } from "react";

export const SidebarSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-white rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full text-left text-lg font-semibold py-3 px-4 bg-gray-800 text-white"
        onClick={toggle}
      >
        {title}
      </button>
      {isOpen && (
        <div className="bg-gray-50 p-4">
          {items.map((item, index) => (
            <button
              key={index}
              className="text-gray-700 hover:bg-gray-200 w-full text-left px-4 py-2 mb-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
