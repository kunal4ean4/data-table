import React from 'react';
import { FaPlus } from "react-icons/fa";

const Data = ({
  searchTitle,
  sortOrder,
  selectCategory,
  START,
  END,
  Total_No_of_Page_Tabs,
  handleAddToCart
}) => {
  let finalData = [...searchTitle];

  //Categories part
  if (selectCategory.length > 0) {
    finalData = finalData.filter((item) =>
      selectCategory.includes(item.category)
    );
  }

  //Sorting the order by price
  if (sortOrder === 'lowToHigh') {
    finalData.sort((a, b) => a.price - b.price);
  }
  if (sortOrder === 'highToLow') {
    finalData.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        {finalData.slice(START, END).map((datas) => {
          return (
            <tbody key={datas.id}>
              <tr>
                <td>{datas.id}</td>
                <td>{datas.title}</td>
                <td>{datas.category}</td>
                <td>{datas.brand}</td>
                <td>{datas.price}</td>
                <td>
                  <button onClick={()=>handleAddToCart(datas)}><FaPlus />
</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default Data;
