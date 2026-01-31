import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';
import { HomePage } from '../pages/home-page';

export class LoginFlow {
  constructor(private readonly page: Page) {}

  async loginUser(user: CreateUserRequest): Promise<HomePage> {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToLogin();
    await loginPage.fillAndSubmitLoginForm(user.email, user.password);

    const homePage = new HomePage(this.page);
    await homePage.waitForLogoutLinkVisible();
    return homePage;
  }
}