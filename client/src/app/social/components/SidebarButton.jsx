import React from "react";

export const SidebarButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left text-lg font-semibold py-3 px-4 bg-gray-800 text-white mb-2"
    >
      {text}
    </button>
  );
};
