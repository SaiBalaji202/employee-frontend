import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import './Search.css';

export default function Search({placeholder, onSearch, title}) {
  const handleKeyDown = useCallback (
    e => {
      if (e.key === 'Enter') {
        onSearch (e.target.value.trim ());
      }
    },
    [onSearch]
  );

  const handleSearch = useCallback (
    e => {
      const value = e.target.value;
      onSearch (value.trim ());
    },
    [onSearch]
  );

  return (
    <div className="search">
      <input
        className="form-control form-control-sm"
        type="text"
        placeholder={placeholder || 'Search...'}
        onKeyDown={handleKeyDown}
        onChange={handleSearch}
        aria-label="Search"
        title={title || 'Press Enter to Search'}
      />
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
};
