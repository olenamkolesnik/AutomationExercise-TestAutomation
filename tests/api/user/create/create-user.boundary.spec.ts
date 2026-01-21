import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { boundaryUsers } from '../../../../src/api/data/user-boundaries';
import { test, expect } from '../../../../src/api/fixtures/api';

test.describe('Create User Boundary Tests', () => {
  const boundaryCases = [
    { name: 'DOB year = 1900', user: boundaryUsers.dobMinYear() },
    { name: 'Long but valid strings', user: boundaryUsers.longStrings() },
    { name: 'Rare characters', user: boundaryUsers.rareCharacters() },
    { name: 'Max DOB year = current year - 18', user: boundaryUsers.dobMaxYear() },
  ];

  for (const caseData of boundaryCases) {
    test(caseData.name, async ({ userClient }) => {
      const response = await userClient.createUser(caseData.user);

      expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
      expect(response.message).toContain('User created');

      await userClient.deleteUserByEmailAndPassword(caseData.user.email, caseData.user.password);
    });
  }
});
