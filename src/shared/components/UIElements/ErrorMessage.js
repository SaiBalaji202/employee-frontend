import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorMessage({message}) {
  return (
    <div style={style}>
      <i style={{marginRight: '4px'}} className="fa fa-exclamation" />

      {message}
    </div>
  );
}

const style = {
  padding: '1rem',
  backgroundColor: '#ff7675',
  borderRadius: '8px',
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
