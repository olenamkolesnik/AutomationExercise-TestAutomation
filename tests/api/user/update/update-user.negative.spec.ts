import { test } from '../../../../src/common/fixtures/user.fixture';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { expect } from '@playwright/test';
import { buildUser } from '../../../../src/api/data/user-factory';
import { mapToUpdateUserDto } from '../../../../src/api/mappers/user.mapper';
import { validateCommonResponse } from '../../../../src/api/contracts/validators/common-response.validator';
import { expectSchema } from '../../../../src/api/assertions/expectSchema';
import { omitField } from '../../../../src/common/utils/object.utils';
import { UpdateUserDto } from '../../../../src/api/contracts/dto/update-user.dto';

test.describe('API: Update User - Negative', () => {
  test('Should fail when email is missing', async ({
    userClient,
    testUser,
  }) => {
    const user = buildUser({
      password: testUser.password,
    });
    const updateUserDto = mapToUpdateUserDto(user);
    const updateData = omitField(updateUserDto, 'email');

    const response = await userClient.updateUser(updateData as unknown as UpdateUserDto);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('email');
  });

  test('Should fail when password is missing', async ({
    userClient,
    testUser,
  }) => {
    const user = buildUser({
      email: testUser.email,
    });
    const updateUserDto = mapToUpdateUserDto(user);
    const updateData = omitField(updateUserDto, 'password');

    const response = await userClient.updateUser(updateData as unknown as UpdateUserDto);

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.message).toContain('password parameter');
  });

  test('Should return account not found when email is empty', async ({
    userClient,
    testUser,
  }) => {
    const updateData = buildUser({
      email: '',
      password: testUser.password,
    });

    const response = await userClient.updateUser(
      mapToUpdateUserDto(updateData),
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should return account not found when password is empty', async ({
    userClient,
    testUser,
  }) => {
    const updateData = buildUser({
      email: testUser.email,
      password: '',
    });

    const response = await userClient.updateUser(
      mapToUpdateUserDto(updateData),
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should fail with invalid password', async ({
    userClient,
    testUser,
  }) => {
    const updateData = buildUser({
      email: testUser.email,
      password: 'WrongPassword123',
    });

    const response = await userClient.updateUser(
      mapToUpdateUserDto(updateData),
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });

  test('Should fail with non-existing email', async ({
    userClient,
    testUser,
  }) => {
    const updateData = buildUser({
      email: 'non-existing@email.com',
      password: testUser.password,
    });

    const response = await userClient.updateUser(
      mapToUpdateUserDto(updateData),
    );

    expectSchema(response.rawBody, validateCommonResponse);
    expect(response.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.message).toBe('Account not found!');
  });
});
