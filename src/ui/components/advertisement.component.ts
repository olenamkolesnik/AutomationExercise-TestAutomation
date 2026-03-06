import { Locator, Page } from '@playwright/test';

export class AdvertisementComponent {
  private readonly adCloseButton: Locator;

  constructor(private readonly page: Page) {
    this.adCloseButton = this.page
      .locator('#dismiss-button')
      .or(this.page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' }));
  }

  async closeIfVisible() {
    if (await this.adCloseButton.isVisible({ timeout: 2000 })) {
      await this.adCloseButton.click();
    }
  }
}
