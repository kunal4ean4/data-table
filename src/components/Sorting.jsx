import React, { useState } from 'react';

const Sorting = ({ data,searchTitle ,sortOrder,setSortOrder}) => {

  
  return (
    <div className="sortContainer">
      <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)}>
        <option value="">Sort By</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        
      </select>
    </div>
  );
};

export default Sorting;
