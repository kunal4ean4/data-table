import React from 'react';

const Search = ({ inputSearch, setInputSearch, handleOnChange }) => {
  return (
    <>
      <input
      
        value={inputSearch}
        onChange={handleOnChange}
        type="search"
        placeholder="Enter your search"
      />
      {/* <button>Search</button> */}
    </>
  );
};

export default Search;
