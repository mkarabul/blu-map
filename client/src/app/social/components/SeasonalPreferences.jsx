import React, { useState, useEffect } from "react";

const seasons = {
  Spring: ["March", "April", "May"],
  Summer: ["June", "July", "August"],
  Autumn: ["September", "October", "November"],
  Winter: ["December", "January", "February"],
};

function SeasonalPreferences({
  posts,
  setSeasonFilter,
  checkedSeasons,
  setCheckedSeasons,
}) {
  useEffect(() => {
    const seasonFilter = checkedSeasons.reduce((acc, season) => {
      acc[season] = true;
      return acc;
    }, {});
    setSeasonFilter(seasonFilter);
  }, [checkedSeasons]);

  return (
    <div className="md:fixed pb-32 md:right-4 lg:right-8 md:top-4 md:w-1/5 p-4 md:h-screen overflow-auto hidden md:block mt-14 shadow-2xl">
      <h2 className="font-bold text-xl mb-4">Seasonal Preferences</h2>

      {Object.keys(seasons).map((season) => (
        <div key={season} className="mt-4">
          <h3 className="font-semibold text-lg mb-2">{season}</h3>

          {seasons[season].map((month, index) => (
            <button
              key={month + index}
              className="btn btn-outline w-full rounded-full flex justify-between items-center mt-2"
              onClick={() => {
                if (checkedSeasons.includes(month)) {
                  setCheckedSeasons(
                    checkedSeasons.filter((item) => item !== month)
                  );
                } else {
                  setCheckedSeasons([...checkedSeasons, month]);
                }
              }}
            >
              <span>{month}</span>
              <input
                type="checkbox"
                className="ml-2"
                checked={checkedSeasons.includes(month)}
                readOnly
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeasonalPreferences;
