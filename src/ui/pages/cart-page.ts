import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartItemComponent } from '../components/cart-item.component';

export class CartPage extends BasePage {
  private readonly cartInfoTable = this.page.locator('#cart_info_table');
  private readonly rows = this.page.locator('#cart_info_table tbody tr');

  private readonly proceedToCheckoutButton = this.page.getByText(
    'Proceed To Checkout',
  );

  constructor(page: Page) {
    super(page);
  }

  async expectPageOpened() {
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.cartInfoTable).toBeVisible();
  }

  async getCartItemByName(name: string) {
    const row = this.rows.filter({ hasText: name });
    await expect(row).toHaveCount(1);

    return new CartItemComponent(row);
  }

  async proceedToCheckout() {
    await Promise.all([
      this.page.waitForURL(/\/checkout/),
      this.proceedToCheckoutButton.click(),
    ]);
  }
}
