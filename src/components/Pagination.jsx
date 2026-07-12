import React from 'react';

const Pagination = ({
  Total_No_of_Page_Tabs,
  handleClickPagination,
  page,
  prePage,
  nextPage,
}) => {
  return (
    <div>
      <button disabled={page === Total_No_of_Page_Tabs - 1} onClick={nextPage}>
        ▶️
      </button>
      {[...Array(Total_No_of_Page_Tabs).keys()].map((n) => (
        <button
          className={`${n == page ? 'activeColor' : ''}`}
          onClick={() => handleClickPagination(n)}
        >
          {n}
        </button>
      ))}
      <button disabled={page === 0} onClick={prePage}>
        ◀️
      </button>
    </div>
  );
};

export default Pagination;
