import { expect } from '@playwright/test';
import { CreateUserRequest } from '../models/requests/create-user.request';
import { UserDetailsResponse } from '../models/responses/user-details.response';
import { UpdateUserRequest } from '../models/requests/update-user.request';

/**
 * Assert that the retrieved user from API matches the expected test user.
 * Converts number/string fields as needed for comparison.
 */
export function expectUsersToBeEqual(
  retrievedUser: UserDetailsResponse,
  testUser: CreateUserRequest | UpdateUserRequest,
) {
  expect(retrievedUser.id).toBeDefined();
  expect(retrievedUser.name).toBe(testUser.name);
  expect(retrievedUser.email).toBe(testUser.email);
  expect(retrievedUser.title).toBe(testUser.title);
  expect(retrievedUser.birth_day).toBe(testUser.birth_date.toString());
  expect(retrievedUser.birth_month).toBe(testUser.birth_month.toString());
  expect(retrievedUser.birth_year).toBe(testUser.birth_year.toString());
  expect(retrievedUser.first_name).toBe(testUser.firstname);
  expect(retrievedUser.last_name).toBe(testUser.lastname);
  expect(retrievedUser.company).toBe(testUser.company);
  expect(retrievedUser.address1).toBe(testUser.address1);
  expect(retrievedUser.address2).toBe(testUser.address2);
  expect(retrievedUser.country).toBe(testUser.country);
  expect(retrievedUser.zipcode).toBe(testUser.zipcode);
  expect(retrievedUser.state).toBe(testUser.state);
  expect(retrievedUser.city).toBe(testUser.city);
}
