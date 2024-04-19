import React, { useState, useEffect } from "react";

const LocationRecommendation = ({ loc, defaultStart, defaultEnd, addActivity }) => {
  if (!loc) return <h3 className="text-center p-4">No location</h3>;

  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `/api/places?location=${loc}`
      );
      const data = await response.json();
      setResults(data);
    };
    getResults();
  }, [loc]);

  const addRecc = (recc) => {
    addActivity({
      name: recc,
      start: defaultStart,
      end: defaultEnd,
      id: crypto.randomUUID(),
    });
  };

  return (
    <ul
      className="p-4 bg-base-200 w-full rounded-lg mb-2 max-h-96 overflow-y-scroll overflow-x-hidden"
      data-testid="activity-recommendation"
    >
      {results && results.length > 0 ? (
        results.map((res, index) => (
          <li
            key={index}
            onClick={(e) => addRecc(res.name)}
            className="btn btn-primary btn-sm w-full text-left my-2 flex justify-start"
          >
            {res.name}
          </li>
        ))
      ) : (
        <div className="w-full text-center">
          <span className="loading loading-spinner loading-sm text-center"></span>
        </div>
      )}
    </ul>
  );
};

export default LocationRecommendation;
