import {useReducer, useCallback} from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const input in state.inputs) {
        if (!state.inputs[input]) continue;

        if (input === action.input) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.input]: {value: action.value, isValid: action.isValid},
        },
        isValid: formIsValid,
      };
    case 'SET':
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export default function useForm (initialInputs, initialValidity) {
  const [formState, dispatch] = useReducer (formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputChanged = useCallback ((id, value, isValid) => {
    dispatch ({
      type: 'INPUT_CHANGE',
      input: id,
      value,
      isValid,
    });
  }, []);

  const setFormState = useCallback ((inputs, isValid) => {
    dispatch ({
      type: 'SET',
      inputs,
      isValid,
    });
  }, []);

  return [formState, inputChanged, setFormState];
}
