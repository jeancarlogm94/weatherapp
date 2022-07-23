import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Bogota",
    },
    {
      id: 2,
      title: "London",
    },
    {
      id: 3,
      title: "Sydney",
    },
    {
      id: 4,
      title: "Tokyo",
    },
 
  ];

  return (
    <div className="d-flex justify-content-center mx-5">
      {cities.map((city) => (
        <button
  
          key={city.id}
          className="mx-auto text-white text-lg font-medium transition ease-out hover:scale-125"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;