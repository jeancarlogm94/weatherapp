import React from 'react';

const CityNotFound = () => {
  return (
    <div>
      <div
        class="mx-auto text-center max-w-md my-3 px-8 p-4 bg-red-100 rounded-lg dark:bg-red-500 dark:text-white"
        role="alert"
      >
        <h3 class="font-medium">Sorry!</h3> No cities were found by the search.
      </div>
    </div>
  );
};

export default CityNotFound;