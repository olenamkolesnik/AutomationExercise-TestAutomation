import { faker } from '@faker-js/faker';
import {
  Title,
  UserRegistrationModel,
} from '../models/user-registration-model';

const TITLES: Title[] = ['Mr', 'Mrs', 'Miss'];
const COUNTRIES: string[] = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'Singapore',
  'New Zealand',
  'United Kingdom',
  'Turkey',
  'South Africa',
  'Germany',
  'France',
  'Netherlands',
  'Japan',
];

export function createUserRegistrationObject(): UserRegistrationModel {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    title: faker.helpers.arrayElement(TITLES),
    birth_date: faker.number.int({ min: 1, max: 28 }),
    birth_month: faker.number.int({ min: 1, max: 12 }),
    birth_year: faker.number.int({ min: 1950, max: 2024 }),
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
}
