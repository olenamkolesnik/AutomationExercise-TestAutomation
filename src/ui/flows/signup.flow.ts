import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { SignupPage } from '../pages/signup-page';
import { AccountCreatedPage } from '../pages/account-created-page';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';

export class SignupFlow {
  constructor(private readonly page: Page) {}

  async createNewUser(user: CreateUserRequest): Promise<AccountCreatedPage> {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToLogin();
    await loginPage.fillAndSubmitSignupForm(user);

    const signupPage = new SignupPage(this.page);
    await signupPage.fillAndSubmit(user);

    return new AccountCreatedPage(this.page);
  }
}