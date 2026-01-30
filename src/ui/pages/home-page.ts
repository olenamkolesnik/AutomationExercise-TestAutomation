import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }
  loggedInAsText(userName: string): Locator {
      return this.page.getByText(`Logged in as ${userName}`);
  }

  async waitForLogoutLinkVisible() {
  await this.logoutLink.waitFor({ state: 'visible' });
}
}
