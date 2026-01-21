import {
  test,
  expect,
} from '../../../../src/api/fixtures/delete-created-users';
import { buildUser } from '../../../../src/api/data/user-factory';
import { boundaryUsers } from '../../../../src/api/data/user-boundaries';
import { HTTP_STATUS } from '../../../../src/api/constants/http-status';
import { isUserDTO } from '../../../../src/api/dto/user-guard';

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

    if (!isUserDTO(retrieved.data)) {
      throw new Error(
        `Expected UserDTO, got ${JSON.stringify(retrieved.data)}`
      );
    }
    expect(retrieved.data.name).toBe(user.name);
    expect(retrieved.data.email).toBe(user.email);

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

  test('TC11-06 — Create user with max DOB year = current year - 18', async ({
    userClient,
    createdUsers,
  }) => {
    const user = boundaryUsers.dobMaxYear();

    const res = await userClient.createUser(user);
    expect(res.responseCode).toBe(201);

    createdUsers.push({ email: user.email, password: user.password });
  });
});
