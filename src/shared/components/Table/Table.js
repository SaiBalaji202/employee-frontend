import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table({columns, data, onClick}) {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} onClick={onClick} />
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
