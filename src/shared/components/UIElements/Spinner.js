import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

export default function Spinner({asOverlay}) {
  return (
    <div className={asOverlay && 'spinner-overlay'}>
      <div className="spinner" />
    </div>
  );
}

Spinner.propTypes = {
  asOverlay: PropTypes.bool,
};
