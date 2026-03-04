
const userDetailsSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'id', 'name', 'email', 'title', 'birth_day', 'birth_month', 'birth_year',
    'first_name', 'last_name', 'company', 'address1', 'address2', 'country',
    'state', 'city', 'zipcode'
  ],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    title: { type: 'string' },
    birth_day: { type: 'string' },
    birth_month: { type: 'string' },
    birth_year: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    company: { type: 'string' },
    address1: { type: 'string' },
    address2: { type: 'string' },
    country: { type: 'string' },
    state: { type: 'string' },
    city: { type: 'string' },
    zipcode: { type: 'string' }
  }
};

export const getUserResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['httpStatus', 'responseCode', 'data'],
  properties: {
    httpStatus: { type: 'number' },
    responseCode: { type: 'number' },
    message: { type: ['string', 'null'] },
    data: {
      anyOf: [
        userDetailsSchema,
        { type: 'null' }
      ]
    },
    rawBody: { type: ['object', 'null'], additionalProperties: true }
  }
} as const; // use `as const` to preserve literal types
