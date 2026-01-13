import { test, expect } from '../../../../src/api/fixtures/delete-created-users';
import { buildUser } from '../../../../src/api/data/user-factory';
import { boundaryUsers } from '../../../../src/api/data/user-boundaries';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { UserDTO } from '../../../../src/api/dto/user-dto';

test.describe('Create User Positive Tests', () => {
  test('TC11-01 — Should create user with valid required data', async ({
    userClient,
    createdUsers,
  }) => {
    const user = buildUser();

    // Act - create user
    const response = await userClient.createUser(user);

    // Assert - verify user creation
    expect(response.responseCode).toBe(HTTP_STATUS.CREATED);
    expect(response.message).toContain('User created!');

    //Act - retrieve user to verify
    const retrieved = await userClient.getUserByEmail(user.email);

    // Assert - verify retrieved user data
    expect(retrieved.responseCode).toBe(HTTP_STATUS.OK);
    expect(retrieved.data).toBeTruthy();

    const retrievedUser = retrieved.data as UserDTO;
    expect(retrievedUser.name).toBe(user.name);
    expect(retrievedUser.email).toBe(user.email);

    createdUsers.push({ email: user.email, password: user.password });
  });

  test('TC11-03 — Create user with DOB year = 1900', async ({
    userClient,
    createdUsers,
  }) => {
    const user = boundaryUsers.dobMinYear();

    const res = await userClient.createUser(user);
    expect(res.responseCode).toBe(201);

    createdUsers.push({ email: user.email, password: user.password });
  });

  test('TC11-04 — Create user with long but valid strings', async ({
    userClient,
    createdUsers,
  }) => {
    const user = boundaryUsers.longStrings();

    const res = await userClient.createUser(user);
    expect(res.responseCode).toBe(201);

    createdUsers.push({ email: user.email, password: user.password });
  });

  test('TC11-05 — Create user with rare characters', async ({
    userClient,
    createdUsers,
  }) => {
    const user = boundaryUsers.rareCharacters();

    const res = await userClient.createUser(user);
    expect(res.responseCode).toBe(201);

    createdUsers.push({ email: user.email, password: user.password });
  });
});
