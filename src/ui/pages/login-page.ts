import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
export class LoginPage extends BasePage {
  private static readonly URL_PATTERN = /\/login/;
  private static readonly TITLE =
    'Automation Exercise - Signup / Login';
  
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
  private readonly invalidCredentialsError = this.loginForm.getByText(
    'Your email or password is incorrect!',
  );

  constructor(page: Page) {
    super(page);
    /*
    this.loginForm = page.locator('.login-form');
    this.emailInputLoginForm = this.loginForm.locator('input[name="email"]');
    this.passwordInputLoginForm = this.loginForm.locator(
      'input[name="password"]',
    );
    this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });
   

    this.signupForm = page.locator('.signup-form');
    this.nameInputSignupForm = this.signupForm.locator('input[name="name"]');
    this.emailInputSignupForm = this.signupForm.locator('input[name="email"]');
    this.signupButton = this.signupForm.getByRole('button', { name: 'Signup' });*/
  }

  async navigateToLogin() {
    await this.page.goto('/login');
  }

  async isAt(): Promise<boolean> {
    const [url, title] = await Promise.all([
      this.page.url(),
      this.page.title(),
    ]);

    return (
      LoginPage.URL_PATTERN.test(url) &&
      title === LoginPage.TITLE
    );
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

  async submitLoginForm() {
    await this.loginButton.click();
  }

  async getLoginEmailValidationState() {
    return this.getEmailValidationState(this.emailInputLoginForm);
  }

  async getSignupEmailValidationState() {
    return this.getEmailValidationState(this.emailInputSignupForm);
  }

  private async getEmailValidationState(locator: Locator): Promise<{
    isValid: boolean;
    isMissing: boolean;
    message: string;
  }> {
    return locator.evaluate((el: HTMLInputElement) => ({
      isValid: el.checkValidity(),
      isMissing: el.validity.valueMissing,
      message: el.validationMessage,
    }));
  }

  async hasInvalidCredentialsError(): Promise<boolean> {
  return this.invalidCredentialsError.isVisible();
}

async isOpened(): Promise<boolean> {
    return this.page.url().includes('/login');
  }
}
