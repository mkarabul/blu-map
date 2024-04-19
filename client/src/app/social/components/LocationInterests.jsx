import React, { useState, useEffect } from "react";

function LocationInterests({ posts, setLocationFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationInterests, setLocationInterests] = useState({});

  const toggleOpen = () => setIsOpen(!isOpen);

  const [checkedCities, setCheckedCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (posts && posts.length > 0) {
        const interests = {};

        posts.forEach((post) => {
          const { country, city } = post;

          if (country === "Unknown" || city === "Unknown") {
            return;
          }

          if (!interests[country]) {
            interests[country] = [];
          }

          if (!interests[country].includes(city)) {
            interests[country].push(city);
          }
        });

        setLocationInterests(interests);
      }
    };

    fetchData();
  }, [posts]);

  useEffect(() => {
    const locationFilter = checkedCities.reduce((acc, city) => {
      acc[city] = true;
      return acc;
    }, {});
    setLocationFilter(locationFilter);
  }, [checkedCities]);

  return (
    <div className="md:fixed pb-32 md:left-4 lg:left-8 md:top-4 md:w-1/5 p-4 md:h-screen overflow-auto hidden md:block mt-14 shadow-2xl">
      <h2 className="font-bold text-xl mb-4">Location Preferences</h2>

      {Object.keys(locationInterests).map((country) => (
        <div key={country} className="mt-4">
          <h3 className="font-semibold text-lg mb-2">{country}</h3>
          <div className="w-full">
            {locationInterests[country].map((city) => (
              <div
                className="flex justify-between items-center mb-2"
                key={city}
              >
                <button
                  className="btn btn-outline w-full rounded-full flex justify-between items-center"
                  onClick={() => {
                    if (checkedCities.includes(city)) {
                      setCheckedCities(
                        checkedCities.filter((item) => item !== city)
                      );
                    } else {
                      setCheckedCities([...checkedCities, city]);
                    }
                  }}
                >
                  <span>{city}</span>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={checkedCities.includes(city)}
                    readOnly
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationInterests;
