import { type Locator, type Page } from '@playwright/test';
export class AccountCreatedPage {
  readonly page: Page;
  accountCreatedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountCreatedHeading = this.page.getByRole('heading', { name: 'Account Created!' })
  }
}
