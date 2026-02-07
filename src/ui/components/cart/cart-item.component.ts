import { Locator } from '@playwright/test';
import { CartItemUi } from './cart-item.model';
import { expect } from '../../../common/fixtures/products-fixture';

export class CartItemComponent {
  constructor(private readonly root: Locator) {}

  async getData(): Promise<CartItemUi> {
     await expect(this.root).toHaveCount(1);
     
    return {
      name: await this.root.locator('.cart_description').innerText(),
      price: await this.root.locator('.cart_price').innerText(),
      quantity: await this.root.locator('.cart_quantity').innerText(),
      total: await this.root.locator('.cart_total').innerText(),
    };
  }
}
