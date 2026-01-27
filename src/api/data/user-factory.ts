import { faker } from '@faker-js/faker';
import { CreateUserRequest } from '../models/requests/create-user.request';
import { logger } from '../../../src/common/utils/logger';
import { TITLES } from '../constants/titles';
import { COUNTRIES } from '../constants/countries';

export type UserOverrides = Partial<CreateUserRequest>;

export function buildUser(overrides: UserOverrides = {}): CreateUserRequest {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 18;

  const base: CreateUserRequest = {
    name: faker.person.firstName(),
    email: `autotest+${Date.now()}@example.com`,
    password: faker.internet.password({ length: 10 }),
    title: faker.helpers.arrayElement(TITLES),
    birth_date: faker.number.int({ min: 1, max: 28 }),
    birth_month: faker.number.int({ min: 1, max: 12 }),
    birth_year: faker.number.int({ min: 1950, max: maxYear }),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.helpers.arrayElement(COUNTRIES),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };

  logger.debug(`Built user data: ${JSON.stringify({ ...base, ...overrides })}`);

  return { ...base, ...overrides } as CreateUserRequest;
}
