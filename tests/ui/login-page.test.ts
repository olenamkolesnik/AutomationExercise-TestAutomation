import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/login-page';
import { HeaderComponent } from '../../src/ui/components/header-component';
import { FooterComponent } from '../../src/ui/components/footer-component';

test.describe('Login Page Structure', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should expose correct login page structure', async () => {
    await loginPage.assertAriaStructure();
  });
  test('should expose correct header structure', async ({ page }) => {
    const headerComponent = new HeaderComponent(page);
    await headerComponent.assertAriaStructure();
   
  });
  test('should expose correct footer structure', async ({ page }) => {
    const footerComponent = new FooterComponent(page);
    await footerComponent.assertAriaStructure();
  });
});
