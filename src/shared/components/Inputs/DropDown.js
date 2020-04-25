import React from 'react';
import PropTypes from 'prop-types';

export default function DropDown({id, label, options, onChange}) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select name={id} id={id} onClick={e => onChange (e.target.value)}>
        {options.map (option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
