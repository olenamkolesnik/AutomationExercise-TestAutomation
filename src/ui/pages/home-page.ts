import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private readonly loggedInBanner = (userName: string) =>
    this.page.getByText(`Logged in as ${userName}`);
  private readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  constructor(page: Page) {
    super(page);
  }

  async expectLoggedInAs(userName: string) {
    await expect(this.loggedInBanner(userName)).toBeVisible();
  }

  async expectLogoutVisible() {
    await expect(this.logoutLink).toBeVisible();
  }
}
