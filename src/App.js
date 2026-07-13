import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Data from "./components/Data";
import Sorting from "./components/Sorting";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
export default function App() {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("all");
  const [selectCategory, setSelectCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [cart, setCart] = useState([]);
  const fetchData = async () => {
    const resolve = await fetch("https://dummyjson.com/products?limit=200");
    const result = await resolve.json();
    setData(result.products);
  };

  useEffect(() => {
    fetchData();
  }, [inputSearch]);

  const debouncedHandle = (fn, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedValue = useMemo(() => {
    return debouncedHandle((value) => {
      setDebouncedInput(value);
    }, 500);
  }, []);

  const handleOnChange = (e) => {
    setInputSearch(e.target.value);
    debouncedValue(e.target.value);
  };
  const searchTitle = data.filter((itemInput) =>
    itemInput.title.toLowerCase().includes(debouncedInput.toLowerCase()),
  );

  //Add to cart functionality
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

    
  };
  const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    },0);
    console.log("Total Price",totalPrice)
  //Pagination
  const Total_Pro_On_Page = 10;
  const Total_No_Of_Products = data.length;
  const Total_No_of_Page_Tabs = Math.ceil(
    Total_No_Of_Products / Total_Pro_On_Page,
  );
  const START = Total_Pro_On_Page * page;
  const END = START + Total_Pro_On_Page;

  const handleClickPagination = (n) => {
    setPage(n);
  };

  const prePage = () => {
    setPage((prev) => prev - 1);
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="container">
      <h1>Data Table</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Sorting
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          data={data}
          searchTitle={searchTitle}
        />
        <Filter
          searchTitle={searchTitle}
          data={data}
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
          searchTitle={searchTitle}
        />

        <Cart
          cart={cart}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          totalPrice={totalPrice}
        />
      </div>

      <Search
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        handleOnChange={handleOnChange}
        debouncedInput={debouncedInput}
      />
      <br />
      <Data
        START={START}
        END={END}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        category={category}
        sortOrder={sortOrder}
        searchTitle={searchTitle}
        data={data}
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        debouncedInput={debouncedInput}
        handleAddToCart={handleAddToCart}
      />
      <Pagination
        prePage={prePage}
        nextPage={nextPage}
        handleClickPagination={handleClickPagination}
        page={page}
        setpage={setPage}
        Total_No_of_Page_Tabs={Total_No_of_Page_Tabs}
      />
    </div>
  );
}
