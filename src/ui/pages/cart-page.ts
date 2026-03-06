import { expect, type Page } from '@playwright/test';

import { logger } from '../../common/utils/logger';
import { CartItemComponent } from '../components/cart-item.component';
import { BasePage } from './base-page';

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
    logger.info(
      'Cart page is opened with correct URL and cart info table is visible',
    );
  }

  async getCartItemByName(name: string) {
    logger.info(`Looking for cart item with name "${name}" in the cart page`);
    const row = this.rows.filter({ hasText: name });
    await expect(row).toHaveCount(1);
    return new CartItemComponent(row);
  }

  async proceedToCheckout() {
    await Promise.all([
      this.page.waitForURL(/\/checkout/),
      this.proceedToCheckoutButton.click(),
    ]);
    logger.info(
      'Clicked on Proceed To Checkout button and navigated to checkout page',
    );
  }
}
