import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const BackDrop = ({onClick}) => {
  const backdrop = <div style={style} onClick={onClick} />;
  return ReactDOM.createPortal (
    backdrop,
    document.getElementById ('backdrop-hook')
  );
};

BackDrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 100,
};

export default BackDrop;
