import { test as base } from '@playwright/test';

import { buildValidCard } from '../../ui/data/card-factory';

type DataFixtures = {
  validCard: ReturnType<typeof buildValidCard>;
};

export const test = base.extend<DataFixtures>({
   
  validCard: async ({}, use) => {
    await use(buildValidCard());
  },
});
