import React, { useState, useEffect,useMemo } from 'react';
import './style.css';
import Search from './components/Search';
import Pagination from './components/Pagination';
import Data from './components/Data';
import Sorting from './components/Sorting';
import Filter from './components/Filter';
export default function App() {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const[debouncedInput,setDebouncedInput]=useState('')
  const [sortOrder, setSortOrder] = useState('');
  const[category,setCategory] =useState('all')
  const[selectCategory,setSelectCategory] =useState([])
  const[page,setPage] = useState(0)
  
  const fetchData = async () => {
    const resolve = await fetch(
      'https://dummyjson.com/products?limit=200'
    );
    const result = await resolve.json();
    setData(result.products);
  };

  useEffect(() => {
    fetchData();
  }, [inputSearch]);



  const debouncedHandle=(fn,delay)=>{
    let timerId;
    return function(...args){
      clearTimeout(timerId)
      timerId=setTimeout(()=>{
        fn(...args)
      },delay)
    }
  }

  const debouncedValue=useMemo(()=>{
    return debouncedHandle((value)=>{
      setDebouncedInput(value)
    },500)
  },[])

  const handleOnChange=(e)=>{
    setInputSearch(e.target.value)
    debouncedValue(e.target.value)
  }
  const searchTitle = data.filter((itemInput) =>
    itemInput.title.toLowerCase().includes(debouncedInput.toLowerCase())
  );

  //Pagination
  const Total_Pro_On_Page=10;
  const Total_No_Of_Products = data.length;
  const Total_No_of_Page_Tabs=Math.ceil(Total_No_Of_Products/Total_Pro_On_Page) 
  const START = Total_Pro_On_Page*page;
  const END = START + Total_Pro_On_Page

  const handleClickPagination=(n)=>{
    setPage(n)
  }

const prePage=()=>{
  setPage((prev)=>prev -1)
}
const nextPage=()=>{
  setPage((prev)=>prev + 1)
}
  return (
    <div className="container">
      <h1>Data Table</h1>

      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Sorting sortOrder={sortOrder} setSortOrder={setSortOrder} data={data} searchTitle={searchTitle}/>
      <Filter searchTitle={searchTitle} data={data} selectCategory={selectCategory} setSelectCategory={setSelectCategory} searchTitle={searchTitle}/>
      </div>
      
      <Search inputSearch={inputSearch} setInputSearch={setInputSearch} handleOnChange={handleOnChange} debouncedInput={debouncedInput}/>
      <br />
      <Data START={START} END={END} selectCategory={selectCategory} setSelectCategory={setSelectCategory} category={category} sortOrder={sortOrder} searchTitle={searchTitle} data={data} inputSearch={inputSearch} setInputSearch={setInputSearch} debouncedInput={debouncedInput}/>
      <Pagination prePage={prePage} nextPage={nextPage} handleClickPagination={handleClickPagination} page={page} setpage={setPage} Total_No_of_Page_Tabs={Total_No_of_Page_Tabs}/>
    </div>
  );
}
