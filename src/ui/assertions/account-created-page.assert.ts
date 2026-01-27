import { expect } from '@playwright/test';
import { AccountCreatedPage } from '../pages/account-created-page';

export class AccountCreatedPageAssert {
  constructor(private readonly page: AccountCreatedPage) {}

  async successHeading() {
    expect(this.page.accountCreatedHeading).toBeVisible();
  }
}