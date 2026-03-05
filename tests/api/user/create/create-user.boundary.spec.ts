import { expect } from '@playwright/test';

import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { boundaryUsers } from '../../../../src/api/data/user-boundaries';
import { mapToCreateUserDto } from '../../../../src/api/mappers/user.mapper';
import { test } from '../../../../src/common/fixtures/api-clients.fixture';

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
        const response = await userClient.createUser(
          mapToCreateUserDto(caseData.user),
        );
        expectSchema(response.rawBody, validateCommonResponse);
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
