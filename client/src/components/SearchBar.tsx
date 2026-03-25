import {useState} from 'react';
import "../styles/auth.css"
function SearchBar(){
    const [query, setQuery] = useState('');
    return(
        <div className="search-row">
            <input
              type="text"
              placeholder="Search will be enabled with future event and organization data"
              className="search-input"
            />
          <button className="search-button">Explore</button>
        </div>
    );
}

export default SearchBar;