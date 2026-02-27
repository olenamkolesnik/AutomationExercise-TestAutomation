import { expect } from '@playwright/test';
import { test } from '../../../../src/common/fixtures/api-clients.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { boundaryUsers } from '../../../../src/api/data/user-boundaries';

test.describe('Create User Boundary Tests', () => {
  const boundaryCases = [
    { name: 'DOB year = 1900', user: boundaryUsers.dobMinYear() },
    { name: 'Long but valid strings', user: boundaryUsers.longStrings() },
    { name: 'Rare characters', user: boundaryUsers.rareCharacters() },
    {
      name: 'Max DOB year = current year - 18',
      user: boundaryUsers.dobMaxYear(),
    },
  ];

  for (const caseData of boundaryCases) {
    test(caseData.name, async ({ userClient }) => {
      try {
        const response = await userClient.createUser(caseData.user);

        expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
        expect(response.message).toContain('User created');
      } finally {
        await userClient.deleteUser({
          email: caseData.user.email,
          password: caseData.user.password,
        });
      }
    });
  }
});
