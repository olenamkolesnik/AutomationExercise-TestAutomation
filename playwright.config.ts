import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { env } from 'process';

import { logger, LogLevel } from './src/common/utils/logger';

// Load .env from project root
dotenv.config();

// Configure log level at the start
logger.setLogLevel(env.LOG_LEVEL as LogLevel);

const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error(
    'BASE_URL environment variable is not set. Check your .env file.',
  );
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['github'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      timeout: 60_000,
      fullyParallel: true,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ui',
      testDir: './tests/ui',
      timeout: 30_000,
      fullyParallel: true,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    //{
    //  name: 'chromium',
    //  use: { ...devices['Desktop Chrome'] },
    //},

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    //{
    //  name: 'webkit',
    //  use: { ...devices['Desktop Safari'] },
    //},

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
