import React from 'react';
import ReactDOM from 'react-dom';

import {CSSTransition} from 'react-transition-group';
import BackDrop from './BackDrop';

import './Modal.css';

function ModalWindow (props) {
  const modalWindow = (
    <div className="modal-window">
      <div className="header">
        {props.header}
      </div>
      <div className="body">
        {props.children}
      </div>
      <div className="footer">
        {props.footer}
      </div>
    </div>
  );
  return ReactDOM.createPortal (
    modalWindow,
    document.getElementById ('modal-hook')
  );
}

export default function Modal (props) {
  return (
    <React.Fragment>
      {props.show && <BackDrop onClick={props.onClose} />}

      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={250}
        classNames="modal"
      >
        <ModalWindow {...props} />
      </CSSTransition>
    </React.Fragment>
  );
}
