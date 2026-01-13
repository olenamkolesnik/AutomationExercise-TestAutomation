export const deleteAccountSchema = {
  type: 'object',
  required: ['responseCode', 'message'],
  properties: {
    responseCode: { type: 'number' },
    message: { type: 'string' }
  }
};
