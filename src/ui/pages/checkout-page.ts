import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartItemComponent } from '../components/cart-item.component';
import { OrderSummaryComponent } from '../components/order-summary.component';

export class CheckoutPage extends BasePage {
  private readonly cartTable = this.page.locator('#cart_info table');
  private readonly cartRows = this.cartTable.locator('tbody tr');
  private readonly orderSummaryRoot = this.page.getByRole('row', { name: 'Total Amount' })

  constructor(page: Page) {
    super(page);
  }

  async expectPageOpened() {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.cartTable).toBeVisible();
  }

  async getCartItemByName(name: string){
    const row = this.cartRows.filter({ hasText: name });
    await expect(row).toHaveCount(1);
    
    return new CartItemComponent(row);
  }

  getOrderSummary(): OrderSummaryComponent {
    return new OrderSummaryComponent(this.orderSummaryRoot);
  }
}
