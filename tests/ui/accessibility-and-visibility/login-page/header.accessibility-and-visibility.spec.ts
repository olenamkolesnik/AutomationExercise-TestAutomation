import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../../src/ui/pages/login-page';
import { HeaderComponent } from '../../../../src/ui/components/header-component';

test.describe('Login Page Header - accessibility and visibility', () => {
  let loginPage: LoginPage, headerComponent: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    headerComponent = new HeaderComponent(page);
  });

  test('Should display header elements', async () => {
    for (const { locator, href } of headerComponent.navigationLinks) {
      await expect(locator).toBeVisible();
      await expect(locator).toHaveAttribute('href', href);
    }
  });

  test('Should match accessibility contract for header', async () => {
    await expect(headerComponent.headerLocator).toMatchAriaSnapshot(
      headerComponent.accessibilityContract(),
    );
  });
});
