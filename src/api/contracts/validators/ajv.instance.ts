import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
  allErrors: true,
  strict: true, // enable strict mode, can relax per schema
  coerceTypes: true, // optional: coerce types like "1" -> 1
  useDefaults: true, // optional: fills default values
});
addFormats(ajv); // email, uri, date, etc.

export default ajv;