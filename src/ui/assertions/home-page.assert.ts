import { expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';

export class HomePageAssert {
  constructor(private readonly page: HomePage) {}

  async isLoggedIn(userName: string) {
      expect(await this.page.getTitle()).toBe('Automation Exercise');
      expect(this.page.logoutLink).toBeVisible();
      expect(this.page.loggedInAsText(userName)).toBeVisible(); 
  }
}