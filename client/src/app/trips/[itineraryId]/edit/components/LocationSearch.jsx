import React, { useState } from "react";
import useCitiesJson from "./useCitiesJson";

const LocationSearch = ({ def, setCity }) => {
  const citiesUtils = useCitiesJson();

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState(def);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setFilteredCities(citiesUtils.searchCities(event.target.value));
  };

  const handleCitySelect = (city) => {
    setCity(city);
    setSearch(city);
    setFocus(false);
  };

  return (
    <div
      className="relative"
      onFocus={() => setFocus(true)}
      onBlur={() => setTimeout(() => setFocus(false), 200)}
    >
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Trip Location..."
        className="input input-bordered input-primary w-full max-w-xs"
      />
      {focus && search && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-md max-w-xs">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
