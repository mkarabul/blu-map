import React, { useState, useEffect } from "react";

function LocationInterests({ posts, setFilteredPosts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationInterests, setLocationInterests] = useState({});

  const toggleOpen = () => setIsOpen(!isOpen);

  const [checkedCities, setCheckedCities] = useState({});

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
    const allUnchecked = Object.values(checkedCities).every(
      (val) => val === false
    );

    if (allUnchecked) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => checkedCities[post.city] === true
      );
      setFilteredPosts(filtered);
    }
  }, [checkedCities, posts]);

  return (
    <div className="md:fixed md:left-4 lg:left-8 md:top-4 md:w-1/5 p-4 md:h-screen overflow-auto hidden md:block mt-14 shadow-2xl">
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
                  onClick={() =>
                    setCheckedCities({
                      ...checkedCities,
                      [city]: !checkedCities[city],
                    })
                  }
                >
                  <span>{city}</span>
                  <input
                    type="checkbox"
                    className="ml-2"
                    checked={checkedCities[city] || false}
                    readOnly
                  />
                </button>
              </div>
            ))}
          </div>
          {/* <hr className="border-t mx-auto w-full my-2" /> */}
        </div>
      ))}
    </div>
  );
}

export default LocationInterests;
