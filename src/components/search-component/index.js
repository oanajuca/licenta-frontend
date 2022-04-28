import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from './search-icon';
import { useDetectOutsideClick} from '../../helpers/useDetectOutsideClick'

function SearchInput() {
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trails, setTrails] = useState([]);
  const [dropdownActive, setDropdownActive] = useDetectOutsideClick(dropdownRef, false);
  const [noResults, setNoResults] = useState('');
  const navigate = useNavigate();
  const toggleSearch = () => setDropdownActive(!dropdownActive);
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
    <div className="search_input__wrapper" ref={dropdownRef}>
      <div className="search_input__box">
        <div className="search_icon__wrapper">
          <i className="search_icon">{SearchIcon}</i>
        </div>
        <input
          className="search_input"
          type="text"
          placeholder="Căutare"
          value={searchTerm}
          onChange={(e) => onChangeHandler(e.target.value)}
          onClick={toggleSearch}
        />
      </div>
      {dropdownActive && (
        <div>
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
                        onClick={() => navigate(`/trail/${searchResult.Id}?tab=0`)}
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
    )}
    </div>
  );
}

export default SearchInput;