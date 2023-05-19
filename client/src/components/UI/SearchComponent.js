import { useContext } from 'react';
import { Input } from 'antd';
import './Search.css';
import Context from '../context/context';


const { Search } = Input;
const SearchComponent = () => {

  const {setQuery} = useContext(Context)


  function onChangeHandler(e) {
    setQuery(e.target.value)
  }

  return (
    <Search
        placeholder="Search for an event..."
        onChange={onChangeHandler}
        className="search-bar"
     />
)
}

export default SearchComponent;