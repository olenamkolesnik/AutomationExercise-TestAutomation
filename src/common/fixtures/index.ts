import { test as base, expect } from '@playwright/test';
import { mergeTests } from '@playwright/test';

import { test as apiTest } from './api';
import { test as userTest } from './user.fixture';
import { test as authPage } from './auth-user.fixture';
import { test as productTest } from './products.fixture';

export const test = mergeTests(
  base,
  apiTest,
  userTest,
  authPage,
  productTest
);

export { expect };
