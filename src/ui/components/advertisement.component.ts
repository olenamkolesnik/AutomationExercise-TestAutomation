import { Locator, Page } from '@playwright/test';

export class AdvertisementComponent {
  private readonly adCloseButton: Locator;

  constructor(private readonly page: Page) {
    this.adCloseButton = this.page.locator('#dismiss-button');
  }

  async closeIfVisible() {
    if (await this.adCloseButton.isVisible({ timeout: 2000 })) {
      await this.adCloseButton.click();
    }
  }
}
