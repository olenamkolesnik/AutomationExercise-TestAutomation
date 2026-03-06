import { expect, type Page } from '@playwright/test';

import { logger } from '../../common/utils/logger';
import { BasePage } from './base-page';
export class AccountCreatedPage extends BasePage {
  private readonly accountCreatedHeading = this.page.getByRole('heading', {
    name: 'Account Created!',
  });

  constructor(page: Page) {
    super(page);
  }

  async expectAccountCreated() {
    await expect(this.page).toHaveURL(/\/account_created/);
    await expect(this.accountCreatedHeading).toBeVisible();
    logger.info('Account created page is displayed with correct URL and heading');
  }
}
