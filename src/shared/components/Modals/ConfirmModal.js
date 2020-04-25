import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

export default function ConfirmModal (props) {
  return (
    <Modal
      onClose={props.cancel.onClick}
      header="Are you Sure?"
      show={props.show}
      footer={
        <React.Fragment>
          <button
            style={{marginRight: '5px'}}
            className={`btn ${props.cancel.className || 'btn-secondary'}`}
            onClick={props.cancel.onClick}
          >
            {props.cancel.label || 'Cancel'}
          </button>
          <button
            className={`btn ${props.confirm.className || 'btn-secondary'}`}
            onClick={props.confirm.onClick}
          >
            {props.confirm.label || 'Continue'}
          </button>
        </React.Fragment>
      }
    >
      <p>{props.message}</p>
    </Modal>
  );
}
ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  confirm: PropTypes.object.isRequired,
  cancel: PropTypes.object.isRequired,
};
