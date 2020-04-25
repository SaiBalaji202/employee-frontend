import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function TableCell({column, data}) {
  return (
    <td>
      {column.content ? column.content (data) : _.get (data, column.path)}
    </td>
  );
}
TableCell.propTypes = {
  column: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
