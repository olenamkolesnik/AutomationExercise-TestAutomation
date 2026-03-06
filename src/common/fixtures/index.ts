import { expect,mergeTests } from '@playwright/test';

import { test as dataTest } from './data.fixture';
import { test as productTest } from './products.fixture';
import { test as uiFlowsTest } from './ui-flows.fixture';

// List of ad domains to block
const blockedAdDomains = [
  'doubleclick.net',
  'googlesyndication.com',
  'googleads.g.doubleclick.net',
  'adsystem.com',
  'adservice.google.com'
];

// Merge your existing fixtures first
let mergedTest = mergeTests(dataTest, productTest, uiFlowsTest);

// Extend mergedTest to add ad-blocking to every page
export const test = mergedTest.extend({
  page: async ({ page }, use) => {
    // Intercept all requests
    await page.route('**/*', route => {
      const url = route.request().url();

      if (blockedAdDomains.some(domain => url.includes(domain))) {
        return route.abort();
      }

      route.continue();
    });

    // Use the page in your test
    await use(page);
  },
});

export { expect };
