import React from 'react';
import PropTypes from 'prop-types';

export default function TableHeader({columns}) {
  return (
    <thead>
      <tr>
        {columns.map (column => {
          return <th key={column.path || column.key}>{column.label}</th>;
        })}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
};
