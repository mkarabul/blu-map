import React from "react";
import cities from "cities.json";

const LocationSearch = ({ loc, setLoc }) => {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div></div>
    </>
  );
};

export default LocationSearch;
