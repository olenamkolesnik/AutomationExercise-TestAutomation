import { expect, type Page } from '@playwright/test';

import { logger } from '../../common/utils/logger';
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
    logger.info('Navigated to login page and verified that it is opened');
  }

  async fillSignupForm(name: string, email: string) {
    logger.info(`Filling signup form with name "${name}" and email "${email}"`);
    await this.nameInputSignupForm.fill(name);
    await this.emailInputSignupForm.fill(email);
  }

  async fillLoginForm(email: string, password: string) {
    logger.info(`Filling login form with email "${email}" and password "******"`);
    await this.emailInputLoginForm.fill(email);
    await this.passwordInputLoginForm.fill(password);
  }

  async submitLoginForm() {
    logger.info('Submitting login form');
    await this.loginButton.click();
  }

  async submitSignupForm() {
    logger.info('Submitting signup form');
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
    logger.info('Login page is opened with correct URL and forms are visible');
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
