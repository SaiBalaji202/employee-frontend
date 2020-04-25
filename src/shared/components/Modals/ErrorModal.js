import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export default function ErrorModal({onClose, error}) {
  return (
    <Modal
      onClose={onClose}
      header="An Error Occured..."
      show={!!error}
      footer={
        <button className="btn btn-danger" onClick={onClose}>Okay</button>
      }
    >
      <p>{error}</p>
    </Modal>
  );
}
ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string,
};
