import { type Locator, type Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly signupForm: Locator;
  readonly emailInputLoginForm: Locator;
  readonly passwordInputLoginForm: Locator;
  readonly loginButton: Locator;
  readonly nameInputSignupForm: Locator;
  readonly emailInputSignupForm: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginForm = page.locator('.login-form');
    this.emailInputLoginForm = this.loginForm.locator('input[name="email"]');
    this.passwordInputLoginForm = this.loginForm.locator(
      'input[name="password"]',
    );
    this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });

    this.signupForm = page.locator('.signup-form');
    this.nameInputSignupForm = this.signupForm.locator('input[name="name"]');
    this.emailInputSignupForm = this.signupForm.locator('input[name="email"]');
    this.signupButton = this.signupForm.getByRole('button', { name: 'Signup' });
    
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async fillAndSubmitSignupForm(name: string, email: string) {
    await this.nameInputSignupForm.fill(name);
    await this.emailInputSignupForm.fill(email);
    await Promise.all([
      this.page.waitForURL(/\/signup/),
      this.signupButton.click(),
    ]);
  }

  async fillAndSubmitLoginForm(email: string, password: string) {
    await this.emailInputLoginForm.fill(email);
    await this.passwordInputLoginForm.fill(password);
    await this.loginButton.click();
  }
}
