import cities from "./cities.json";

const useCitiesJson = () => {
  const searchCities = (search) => {
    return cities
      .filter((city) => city.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.indexOf(search) - b.name.indexOf(search))
      .slice(0, 5)
      .map((city) => `${city.name}, ${city.country}`);
  };

  const getLocationFromCity = (cityString) => {
    if (!cityString) return "";

    const city = cityString.split(", ");
    const cityName = city[0];
    const country = city[1];

    const foundCity = cities.find(
      (c) =>
        c.name.toLowerCase() === cityName.toLowerCase() && c.country === country
    );

    if(!foundCity) return "";

    return `${foundCity.lat}, ${foundCity.lng}`;
  };

  return { searchCities, getLocationFromCity };
};

export default useCitiesJson;
