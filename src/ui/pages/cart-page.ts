import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartItemComponent } from '../components/cart/cart-item.component';

export class CartPage extends BasePage {
  private readonly cartInfoTable = this.page.locator('#cart_info_table');
  private readonly rows = this.page.locator('#cart_info_table tbody tr');

  constructor(page: Page) {
    super(page);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.cartInfoTable).toBeVisible();
  }

  async getCartItemByName(name: string) {
    const row = this.rows.filter({ hasText: name });
    await expect(row).toHaveCount(1);

    const component = new CartItemComponent(row);
    return component.getData();
  }
}
