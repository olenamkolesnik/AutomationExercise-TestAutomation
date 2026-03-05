 
import { expect } from '@playwright/test';

import { User } from '../models/product/user.model';

export function expectUsersToBeEqual(
  actual: User,
  expected: User,
) {
  const { id: _ignored, password: _ignored2, mobileNumber: _ignored3, ...restActual } = actual;
  const { id: __ignored, password: __ignored2, mobileNumber: __ignored3, ...restExpected } = expected;

  expect(restActual).toStrictEqual(restExpected);
}
