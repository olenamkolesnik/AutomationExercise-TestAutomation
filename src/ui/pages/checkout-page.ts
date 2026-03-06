import { expect, Page } from '@playwright/test';

import { logger } from '../../common/utils/logger';
import { CartItemComponent } from '../components/cart-item.component';
import { DeliveryAddressComponent } from '../components/delivery-address.component';
import { OrderSummaryComponent } from '../components/order-summary.component';
import { BasePage } from './base-page';

export class CheckoutPage extends BasePage {
  private readonly cartTable = this.page.locator('#cart_info table');
  private readonly cartRows = this.cartTable.locator('tbody tr');
  private readonly orderSummaryRoot = this.cartTable.getByRole('row', { name: 'Total Amount' })
  private readonly deliveryAddressRoot = this.page.locator('#address_delivery');  
  private readonly invoiceAddressRoot = this.page.locator('#address_invoice');
  private readonly placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });

  constructor(page: Page) {
    super(page);
  }

  async expectPageOpened() {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.cartTable).toBeVisible();
    logger.info('Checkout page is opened with correct URL and cart table is visible');
  }

  async getCartItemByName(name: string){
    logger.info(`Looking for cart item with name "${name}" in the checkout page`);
    const row = this.cartRows.filter({ hasText: name });
    await expect(row, `Cart item "${name}" not found`).toHaveCount(1);
    
    return new CartItemComponent(row);
  }

  getOrderSummary(): OrderSummaryComponent {
    return new OrderSummaryComponent(this.orderSummaryRoot);
  }

  getDeliveryAddress():DeliveryAddressComponent{
    return new DeliveryAddressComponent(this.deliveryAddressRoot);
  }

  getInvoiceAddress():DeliveryAddressComponent{
    return new DeliveryAddressComponent(this.invoiceAddressRoot);
  }

  async clickPlaceOrder(){
    await Promise.all([
      this.page.waitForURL(/\/payment/),
      this.placeOrderButton.click(),
    ]);
    logger.info('Clicked on Place Order button and navigated to payment page');
  }
}
