import React, { useState } from "react";

function LocationFinder() {
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [cities, setCities] = useState(null);
  const [fetchMade, setFetchMade] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      geoFindMe();
    }
  };

  const geoFindMe = () => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      setStatus("Location retrieved");
      setCoords({ latitude, longitude });
      setLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);

      postCoordinates(latitude, longitude);
    };

    const error = () => {
      setStatus("Unable to retrieve your location");
    };

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const postCoordinates = (latitude, longitude) => {
    fetch("/api/places/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data.cities);
        setFetchMade(true);
      })
      .catch((error) => console.error("Error fetching city:", error));
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Find My Location
        {isExpanded && (
          <>
            {status && <p className="mt-2 text-green-500">{status}</p>}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-black underline"
              >
                Open in Maps
              </a>
            )}
            {fetchMade && (!cities || cities.length === 0) && (
              <p className="mt-2 text-red-500">No data gathered</p>
            )}
            {cities && cities.length > 0 && (
              <div className="mt-2">
                <p>Nearby Cities:</p>
                <ul>
                  {cities.map((city, index) => (
                    <li key={index}>{city}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </button>
    </div>
  );
}

export default LocationFinder;
