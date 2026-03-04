import { faker } from '@faker-js/faker';
import { logger } from '../../../src/common/utils/logger';
import { TITLES } from '../constants/titles';
import { COUNTRIES } from '../constants/countries';
import { User } from '../../common/models/product/user.model';

export type UserOverrides = Partial<User>;

export function buildUser(overrides: UserOverrides = {}): User {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 18;

  const base: User = {
    name: faker.person.firstName(),
    email: `autotest+${Date.now()}@example.com`,
    password: faker.internet.password({ length: 10 }),
    title: faker.helpers.arrayElement(TITLES),
    birthDate: {
      day: faker.number.int({ min: 1, max: 28 }),
      month: faker.number.int({ min: 1, max: 12 }),
      year: faker.number.int({ min: 1950, max: maxYear }),
    },
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: {
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      
    country: faker.helpers.arrayElement(COUNTRIES),
    zipCode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    },
    mobileNumber: faker.phone.number(),
  };

  logger.debug(`Built user data: ${JSON.stringify({ ...base, ...overrides })}`);

  return { ...base, ...overrides } as User;
}
