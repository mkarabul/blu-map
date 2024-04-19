import React, { useState, useEffect } from "react";

const seasons = {
  Spring: ["March", "April", "May"],
  Summer: ["June", "July", "August"],
  Autumn: ["September", "October", "November"],
  Winter: ["December", "January", "February"],
};

function SeasonalPreferences({ posts, setFilteredPosts }) {
  const [checkedSeasons, setCheckedSeasons] = useState({
    Spring: false,
    Summer: false,
    Autumn: false,
    Winter: false,
    March: false,
    April: false,
    May: false,
    June: false,
    July: false,
    August: false,
    September: false,
    October: false,
    November: false,
    December: false,
    January: false,
    February: false,
  });

  useEffect(() => {
    const allUnchecked = Object.values(checkedSeasons).every(
      (val) => val === false
    );

    if (allUnchecked) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const postMonth = new Date(post.tripDate).toLocaleString("default", {
          month: "long",
        });
        console.log(postMonth);
        return Object.entries(checkedSeasons).some(([key, isChecked]) => {
          if (seasons[key]) {
            return isChecked && seasons[key].includes(postMonth);
          } else {
            return isChecked && key === postMonth;
          }
        });
      });
      setFilteredPosts(filtered);
    }
  }, [checkedSeasons, posts]);

  return (
    <div className="md:fixed pb-32 md:right-4 lg:right-8 md:top-4 md:w-1/5 p-4 md:h-screen overflow-auto hidden md:block mt-14 shadow-2xl">
      <h2 className="font-bold text-xl mb-4">Seasonal Preferences</h2>

      {Object.keys(seasons).map((season) => (
        <div key={season} className="mt-4">
          <h3 className="font-semibold text-lg mb-2">{season}</h3>

          {seasons[season].map((month) => (
            <button
              className="btn btn-outline w-full rounded-full flex justify-between items-center mt-2"
              onClick={() => {
                setCheckedSeasons((prevState) => ({
                  ...prevState,
                  [month]: !prevState[month],
                }));
              }}
            >
              <span>{month}</span>
              <input
                type="checkbox"
                className="ml-2"
                checked={checkedSeasons[month]}
                onChange={(e) => e.stopPropagation()}
              />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeasonalPreferences;
