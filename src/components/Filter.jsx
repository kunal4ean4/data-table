import React from 'react';

const Filter = ({ selectCategory, setSelectCategory, data }) => {
  const categories = [...new Set(data.map((item) => item.category))];
  const handleCategoryChanged = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if(checked){
      setSelectCategory((prev)=>[...prev,value])
    }else{
      setSelectCategory((prev)=>prev.filter((cat)=>cat !== value))
    }
  };

  return (
    <div>
      <h3>Categories</h3>

      {categories.map((itemCategory) => (
        <label key={itemCategory}>
          <input
            type="checkbox"
            value={itemCategory}
            onChange={handleCategoryChanged}
            checked={selectCategory.includes(itemCategory)}
          />
          {itemCategory}
        </label>
      ))}
    </div>
  );
};

export default Filter;
