import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const SidebarSection = ({ title }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetch(`/api/preferences/${user?.sub}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error:", error));
    console.log("items", items);
  }, []);

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
          {["activity", "location", "interest"].map((field, index) => (
            <div key={index}>
              <p className="text-blue-500">{field}</p>
              {items &&
                items.map((item, i) =>
                  item[field].map((subItem, subIndex) => (
                    <button
                      key={`${i}-${subIndex}`}
                      className="text-gray-700 hover:bg-gray-200 w-full text-left px-4 py-2 mb-2 rounded-md transition-colors duration-200 ease-in-out"
                    >
                      {subItem}
                    </button>
                  ))
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
