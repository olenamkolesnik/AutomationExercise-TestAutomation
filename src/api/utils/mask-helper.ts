export const mask = (value: string) =>
  value.length <= 2 ? '***' : `${value[0]}***${value[value.length - 1]}`;

const SENSITIVE_KEYS = [
  'password',
  'pwd',
  'token',
  'auth',
  'authorization',
  'apikey',
  'api_key',
  'secret',
  'email',
  'email_address',
];

const isSensitiveKey = (key: string): boolean =>
  SENSITIVE_KEYS.includes(key.toLowerCase());

export const maskSensitiveData = (input: any): any => {
  if (input === null || input === undefined) return input;

  if (typeof input !== 'object') return input; // primitives are returned as-is

  if (Array.isArray(input)) return input.map((item) => maskSensitiveData(item));

  const output: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    if (isSensitiveKey(key) && typeof value === 'string') {
      output[key] = mask(value);
    } else {
      output[key] = maskSensitiveData(value);
    }
  }
  return output;
};