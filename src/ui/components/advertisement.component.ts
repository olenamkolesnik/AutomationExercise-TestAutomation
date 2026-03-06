import { Locator, Page } from '@playwright/test';

export class AdvertisementComponent {
  private readonly closeButtonInPage: Locator;
  private readonly iframeSelector = 'iframe[name="aswift_3"]';

  constructor(private readonly page: Page) {
    this.closeButtonInPage = this.page.locator('#dismiss-button');
  }

  async closeIfVisible() {
    if (await this.closeButtonInPage.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.closeButtonInPage.click();
      return;
    }

    const adFrame = this.page.frameLocator(this.iframeSelector);
    const adCloseButton = adFrame.getByRole('button', { name: 'Close ad' });

    if (await adCloseButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await adCloseButton.click();
    }
  }
}