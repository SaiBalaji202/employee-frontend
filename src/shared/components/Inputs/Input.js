import React, {useReducer, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {validate} from '../../utils/validators';

import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate (action.value, action.validators),
      };

    case 'SET':
      return {
        value: action.value,
        isValid: action.isValid,
        isTouched: false,
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

export default function Input (props) {
  const [inputState, dispatch] = useReducer (inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValidity || false,
    isTouched: false,
  });

  const {value, isValid} = inputState;
  const {id, onInput} = props;

  useEffect (
    () => {
      onInput (id, value, isValid);
    },
    [id, value, isValid, onInput]
  );

  useEffect (
    () => {
      dispatch ({
        type: 'SET',
        value: props.initialValue,
        isValid: props.initialValidity,
      });
    },
    [props.initialValue, props.initialValidity]
  );

  const inputChanged = useCallback (
    e => {
      dispatch ({
        type: 'CHANGE',
        value: e.target.value,
        validators: props.validators,
      });
    },
    [props.validators]
  );

  const inputBlured = useCallback (() => {
    dispatch ({
      type: 'TOUCH',
    });
  }, []);

  const isInvalid = !inputState.isValid && inputState.isTouched;

  const element = props.element === 'input'
    ? <input
        id={props.id}
        type={props.type}
        className={`form-control ${isInvalid && 'form-control--invalid'}`}
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={inputChanged}
        onBlur={inputBlured}
        readOnly={props.readOnly || false}
      />
    : <textarea
        id={props.id}
        className={`form-control ${isInvalid && 'form-control--invalid'}`}
        value={inputState.value}
        rows={props.rows || 3}
        onChange={inputChanged}
        onBlur={inputBlured}
        readOnly={props.readOnly || false}
      />;

  return (
    <div className="form-control-container">
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {isInvalid && <p>{props.errorMessage}</p>}
    </div>
  );
}

Input.propTypes = {
  element: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rows: PropTypes.number,
  initialValue: PropTypes.any,
  initialValidity: PropTypes.bool,
  errorMessage: PropTypes.string,
  validators: PropTypes.array,
  readOnly: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  verifyInitialValidity: (props, propName, ComponentName) => {
    if (
      props['initialValue'] &&
      (!props['initialValidity'] ||
        typeof props['initialValidity'] !== 'boolean')
    ) {
      return new Error ('initialValidy was not set');
    }
  },
};
