import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../../src/ui/pages/login-page';
import { FooterComponent } from '../../../../src/ui/components/footer-component';

test.describe('Login Page Footer - accessibility and visibility', () => {
  let loginPage: LoginPage, footerComponent: FooterComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    footerComponent = new FooterComponent(page);
  });

  test('Should display footer elements', async () => {
    await expect(footerComponent.footer).toBeVisible();
    await expect(footerComponent.subscribeInput).toBeVisible();
    await expect(footerComponent.subscribeButton).toBeVisible();
    await expect(footerComponent.copyright).toBeVisible();
    await expect(footerComponent.subscriptionText).toBeVisible();
  });

  test('Should match accessibility contract for footer', async ({ page }) => {
    const footerComponent = new FooterComponent(page);
    await expect(footerComponent.footer).toMatchAriaSnapshot(footerComponent.accessibilityContract());
  });
});
