import { test } from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expectUsersToBeEqual } from '../../../../src/common/assertions/user.assertions';
import { expect } from '@playwright/test';
import { isUserDetailsDto, validateUserDetails } from '../../../../src/api/contracts/validators/user.validator';
import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { UserDetailsDto } from '../../../../src/api/contracts/dto/user-details.dto';
import { mapToDomainUser } from '../../../../src/api/mappers/user.mapper';

test.describe('API: Get User Detail By Email — Positive', () => {
  test('Should return user details for a valid registered email', async ({
    userClient,
    testUser,
  }) => {
    const response = await userClient.getUserByEmail(testUser.email);

    expectSchema(response, validateUserDetails);
    expect(response.responseCode).toBe(HTTP_STATUS.OK);
    expect(response.message).toBeUndefined();

    isUserDetailsDto(response.data);
    const retrievedUser = mapToDomainUser(response.data as UserDetailsDto);
    expectUsersToBeEqual(retrievedUser, testUser);
  });
});
