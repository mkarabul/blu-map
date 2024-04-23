import cities from "./cities.json";

const useCitiesJson = () => {
  const cityToCityString = (city) => {
    return `${city.name}, ${city.country}`;
  };

  const searchCities = (search) => {
    return cities
      .filter((city) =>
        cityToCityString(city).toLowerCase().includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          cityToCityString(a).toLowerCase().indexOf(search.toLowerCase()) -
          cityToCityString(b).toLowerCase().indexOf(search.toLowerCase())
      )
      .slice(0, 5)
      .map((city) => cityToCityString(city));
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

    if (!foundCity) return "";

    return `${foundCity.lat}, ${foundCity.lng}`;
  };

  return { searchCities, getLocationFromCity };
};

export default useCitiesJson;
