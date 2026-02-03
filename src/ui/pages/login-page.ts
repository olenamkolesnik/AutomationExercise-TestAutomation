import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
export class LoginPage extends BasePage {
  private readonly loginForm = this.page.locator('.login-form');
  private readonly emailInputLoginForm = this.loginForm.locator(
    'input[name="email"]',
  );
  private readonly passwordInputLoginForm = this.loginForm.locator(
    'input[name="password"]',
  );
  private readonly loginButton = this.loginForm.getByRole('button', {
    name: 'Login',
  });
  private readonly signupForm = this.page.locator('.signup-form');
  private readonly nameInputSignupForm =
    this.signupForm.locator('input[name="name"]');
  private readonly emailInputSignupForm = this.signupForm.locator(
    'input[name="email"]',
  );
  private readonly signupButton = this.signupForm.getByRole('button', {
    name: 'Signup',
  });
  private readonly emailOrPasswordIncorrectError = this.loginForm.getByText(
    'Your email or password is incorrect!',
  );

  private readonly emailAddressAlreadyExistsError = this.signupForm.getByText(
    'Email Address already exist!',
  );

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.page.goto('/login');
    await this.expectOpened();
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
    await this.submitLoginForm();
  }

  async submitLoginForm() {
    await this.loginButton.click();
  }

  async submitSignupForm() {
    await this.signupButton.click();
  }

  async expectEmailOrPasswordIncorrectError() {
    await expect(this.emailOrPasswordIncorrectError).toBeVisible();
  }

  async expectEmailAddressAlreadyExistsError() {
    await expect(this.emailAddressAlreadyExistsError).toBeVisible();
  }
  
  async expectOpened() {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.loginForm).toBeVisible();
    await expect(this.signupForm).toBeVisible();
  }

  async expectLoginSubmissionBlocked() {
    await expect(this.loginForm).toBeVisible();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async expectSignupSubmissionBlocked() {
    await expect(this.signupForm).toBeVisible();
    await expect(this.page).toHaveURL(/\/login/);
  }
}
