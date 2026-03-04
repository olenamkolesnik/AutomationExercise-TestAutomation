export const commonResponseSchema = {
  type: 'object',
  required: ['responseCode', 'message'],
  properties: {
    responseCode: { type: 'number' },
    message: { type: 'string' }
  }
};
