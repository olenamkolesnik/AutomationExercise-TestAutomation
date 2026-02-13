import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
export class PaymentDonePage extends BasePage {
  private readonly orderPlacedHeading = this.page.getByRole('heading', {
    name: 'Order Placed!',
  });

  constructor(page: Page) {
    super(page);
  }

  async expectOrderPlaced() {
    await expect(this.page).toHaveURL(/\/payment_done/);
    await expect(this.orderPlacedHeading).toBeVisible();
  }
}
