import { Locator, Page } from '@playwright/test';

export class AdvertisementComponent {
  private readonly closeButtonInPage: Locator;
  private readonly fallbackSelectors = [
    '#dismiss-button',
    '[aria-label="Close ad"]',
    '[title="Close ad"]',
    '.interstitial-wrapper button',
  ];

  constructor(private readonly page: Page) {
    this.closeButtonInPage = this.page.locator('#dismiss-button');
  }

  async closeIfVisible() {
    if (await this.closeButtonInPage.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.closeButtonInPage.click();
      return;
    }

    for (const frame of this.page.frames()) {
      for (const selector of this.fallbackSelectors) {
        const closeButton = frame.locator(selector).first();

        if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
          await closeButton.click({ force: true });
          return;
        }
      }

      const closeAdButton = frame.getByRole('button', { name: /close ad/i }).first();
      if (await closeAdButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeAdButton.click({ force: true });
        return;
      }
    }
  }
}
