import { type Page } from '@playwright/test';
import { BasePage } from './base-page';
export class AccountCreatedPage extends BasePage{
  private readonly accountCreatedHeading = this.page.getByRole('heading', { name: 'Account Created!' })

  constructor(page: Page) {
    super(page);
  }
}