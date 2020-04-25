// VALIDATOR TYPES
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';

// VALIDATOR CONFIG GENERATOR
export const VALIDATOR_REQUIRE = () => ({
  type: VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_MINLENGTH = value => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  value: value,
});
export const VALIDATOR_MAXLENGTH = value => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  value: value,
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim ().length > 0;
    } else if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim ().length >= validator.value;
    } else if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim ().length <= validator.value;
    }
  }
  return isValid;
};
