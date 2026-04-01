import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { env } from 'process';

import { logger, LogLevel } from './src/common/utils/logger';

dotenv.config();
logger.setLogLevel(env.LOG_LEVEL as LogLevel);

const baseUrl = process.env.BASE_URL;
const ciReporters = process.env.CI ? ([['github']] as const) : [];
export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ...ciReporters,
  ],
  use: {
    ...(baseUrl ? { baseURL: baseUrl } : {}),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    {
      name: 'api',
      testDir: './tests/api',
      timeout: 60_000,
      fullyParallel: true,
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
  ],
});
