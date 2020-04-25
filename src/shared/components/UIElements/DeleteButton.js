import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

function DeleteButton({onDelete}) {
  return (
    <i
      style={style}
      className="fa fa-trash"
      aria-hidden="true"
      onClick={onDelete}
    />
  );
}

const style = {
  color: '#f3a683',
  transition: 'color .2s',
  ':hover': {
    color: '#e84118',
  },
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default Radium (DeleteButton);
