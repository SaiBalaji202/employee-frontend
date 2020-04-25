import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import TableCell from './TableCell';

const createCellKey = (column, row) => row.id + (column.path || column.key);

const TableBody = ({columns, data, onClick}) => {
  return (
    <tbody>
      {data.map (row => (
        <tr style={rowStyle} key={row.id} onClick={() => onClick (row)}>
          {columns.map (column => (
            <TableCell
              key={createCellKey (column, row)}
              column={column}
              data={row}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const rowStyle = {
  cursor: 'pointer',
  transition: 'all .2s',
  ':hover': {
    backgroundColor: '#ecf0f1',
  },
};

export default Radium (TableBody);

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
