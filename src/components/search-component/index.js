import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from './search-icon';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trails, setTrails] = useState([]);
  const [noResults, setNoResults] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrails = async () => {
      fetch(`http://localhost:8088/apuseniilapas/api/trail/all`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => setTrails(data));
    };
    loadTrails();
  }, []);

  const onChangeHandler = (searchString) => {
    let matches = [];
    if (searchString.length > 0) {
      matches = trails.filter((trail) => {
        const regex = new RegExp(`${searchString}`, 'gi');
        return trail.Name.match(regex);
      });

      matches.length === 0
        ? setNoResults('No results found')
        : setNoResults('');
    } else setNoResults('');

    setSearchResults(matches);
    setSearchTerm(searchString);
  };

  const handlclick = () => {
    window.location.reload(false);
  };

  return (
    <div className="search_input__wrapper">
      <div className="search_input__box">
        <div className="search_icon__wrapper">
          <i className="search_icon">{SearchIcon}</i>
        </div>
        <input
          className="search_input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      </div>
      {searchTerm.length > 0 && (
      <div className="dropdown-container ">
        {noResults && <p>{noResults}</p>}
        {!noResults && (

        <div className="search_options">
          {searchResults
                    && searchResults.map((searchResult) => (
                      <div
                        key={searchResults.Id}
                        className="clientHover"
                        onClick={() => navigate(`/trail/${searchResult.Id}`)}
                        handleClick={handlclick}
                      >
                        {' '}
                        {searchResult.Name}
                      </div>
                    ))}
        </div>

        )}
      </div>
      )}
    </div>
  );
}

export default SearchInput;