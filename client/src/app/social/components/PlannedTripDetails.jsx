import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { mapping } from "../../trips/components/CountryMapping";

const PlannedTripDetails = ({
  locationInterests,
  setCheckedCities,
  setLocationFilter,
  setSeasonFilter,
  setCheckedSeasons,
}) => {
  const [trip, setTrip] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useUser();
  const [month, setMonth] = useState(null);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      fetchTrip();
    }
  };

  const fetchTrip = () => {
    fetch(`/api/itineraries/${user.sub}/last-itinerary-details`)
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        const { city: location } = data;
        const city = location.split(",")[0];
        const countryCode = location.split(",")[1];
        const country = countryCode ? mapping[countryCode.trim()] : "Unknown";
        const month = new Date(data.updatedAt).toLocaleString("default", {
          month: "long",
        });
        const newCheckedCities = [];
        const newLocationFilter = {};
        const newSeasonFilter = { [month]: true };
        setMonth(month);

        Object.entries(locationInterests).forEach(
          ([interestCountry, cities]) => {
            if (interestCountry === country) {
              cities.forEach((interestCity) => {
                if (interestCity === city && !newCheckedCities.includes(city)) {
                  newCheckedCities.push(city);
                  newLocationFilter[city] = true;
                }
              });
            }
          }
        );

        setCheckedCities(newCheckedCities);
        setLocationFilter(newLocationFilter);
        setCheckedSeasons([month]);
        setSeasonFilter(newSeasonFilter);
      })

      .catch((error) => console.error("Error fetching trip:", error));
  };

  return (
    user && (
      <div className="flex justify-center mt-4">
        <button
          onClick={handleClick}
          className="flex flex-col items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Get Trip Reccommendations According to Planned Trip
          {isExpanded && trip ? (
            <>
              <p className="mt-2">Month: {month}</p>
              <p className="mt-2">City: {trip.city}</p>
            </>
          ) : (
            <></>
          )}
        </button>
      </div>
    )
  );
};

export default PlannedTripDetails;
