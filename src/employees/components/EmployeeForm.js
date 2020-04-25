import React, {useRef, useCallback, useContext, useEffect} from 'react';

import Input from './../../shared/components/Inputs/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from './../../shared/utils/validators';
import useForm from './../../shared/hooks/form-hook';
import {EmployeeContext} from './../context/employee-context';

export default function EmployeeForm (props) {
  const {
    selectedEmployee,
    setSelectedEmployee,
    addEmployee,
    updateEmployee,
  } = useContext (EmployeeContext);

  const initialInputs = useRef ({
    name: {
      value: '',
      isValid: false,
    },
    date: {
      value: '',
      isValid: false,
    },
    status: {
      value: '',
      isValid: false,
    },
  });

  const [formState, inputChanged, setFormState] = useForm (
    initialInputs.current,
    false
  );

  useEffect (
    () => {
      if (selectedEmployee) {
        setFormState (
          {
            name: {
              value: selectedEmployee.name,
              isValid: true,
            },
            date: {
              value: selectedEmployee.date,
              isValid: true,
            },
            status: {
              value: selectedEmployee.status,
              isValid: true,
            },
          },
          true
        );
      }
    },
    [selectedEmployee, setFormState]
  );

  const getFormInputValues = useCallback (
    () => {
      const formInputs = {};
      for (const input in formState.inputs) {
        if (formState.inputs.hasOwnProperty (input)) {
          formInputs[input] = formState.inputs[input].value;
        }
      }
      return formInputs;
    },
    [formState.inputs]
  );

  const submitForm = useCallback (
    e => {
      e.preventDefault ();
      const data = getFormInputValues ();
      if (selectedEmployee) {
        updateEmployee (selectedEmployee.id, data);
      } else {
        setSelectedEmployee (data);
        addEmployee (data);
      }
    },
    [
      getFormInputValues,
      selectedEmployee,
      setSelectedEmployee,
      updateEmployee,
      addEmployee,
    ]
  );

  return (
    <div>
      <h3>
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
      </h3>
      <form onSubmit={submitForm}>
        <Input
          element="input"
          type="text"
          id="name"
          placeHolder="Name..."
          label="Name"
          initialValue={(selectedEmployee && selectedEmployee.name) || ''}
          initialValidity={!!selectedEmployee || false}
          validators={[VALIDATOR_REQUIRE ()]}
          errorMessage="Invalid Name"
          onInput={inputChanged}
          readOnly={!!selectedEmployee}
        />
        <Input
          element="input"
          type="date"
          id="date"
          placeHolder="Date..."
          label="Date"
          initialValue={(selectedEmployee && selectedEmployee.date) || ''}
          initialValidity={!!selectedEmployee || false}
          validators={[VALIDATOR_REQUIRE ()]}
          errorMessage="Invalid Date"
          onInput={inputChanged}
        />
        <Input
          element="text-area"
          id="status"
          placeHolder="Status..."
          label="Status"
          initialValue={(selectedEmployee && selectedEmployee.status) || ''}
          initialValidity={!!selectedEmployee || false}
          validators={[VALIDATOR_MINLENGTH (5)]}
          errorMessage="Invalid Status"
          onInput={inputChanged}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            disabled={!formState.isValid}
            type="submit"
            className="btn btn-primary"
          >
            {selectedEmployee ? 'Update' : 'Submit'}
          </button>
        </div>

      </form>

    </div>
  );
}
