import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly formLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.formLocator = page.locator('#form');
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async assertAriaStructure() {
    await expect(this.formLocator).toMatchAriaSnapshot(`
    - heading "Login to your account" [level=2]
    - textbox "Email Address"
    - textbox "Password"
    - button "Login"
   
    - heading "New User Signup!" [level=2]
    - textbox "Name"
    - textbox "Email Address"
    - button "Signup"
    `);
  }
}
