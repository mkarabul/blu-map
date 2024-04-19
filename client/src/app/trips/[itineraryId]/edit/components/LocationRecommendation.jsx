import React, { useState, useEffect } from "react";

const LocationRecommendation = ({
  loc,
  defaultStart,
  defaultEnd,
  addActivity,
}) => {
  if (!loc) return <h3 className="text-center p-4">No location</h3>;

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [narrow, setNarrow] = useState("");

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/places?location=${loc}&narrow=${narrow}`
      );
      const data = await response.json();
      setResults(data);
      setLoading(false);
    };
    getResults();
  }, [loc, narrow]);

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
      <div className="join w-full justify-center">
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="All"
          defaultChecked={true}
          onClick={() => setNarrow("")}
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="Food"
          onClick={() => setNarrow("restaurant")}
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="Sleep"
          onClick={() => setNarrow("lodging")}
        />
      </div>
      {!loading &&
        results.map((res, index) => (
          <li
            key={index}
            onClick={(e) => addRecc(res.name)}
            className="btn btn-primary w-full text-left my-2 flex justify-start"
          >
            {res.name}
          </li>
        ))}
      {loading && (
        <div className="w-full text-center m-4">
          <span className="loading loading-spinner loading-sm text-center"></span>
        </div>
      )}
    </ul>
  );
};

export default LocationRecommendation;
