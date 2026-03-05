import { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

import { parsePrice } from '../../common/utils/price-parser';
import { CartItemUi } from '../models/cart-item.model';

export class CartItemComponent {
  constructor(private readonly root: Locator) {}

  async getData(): Promise<CartItemUi> {
     await expect(this.root).toHaveCount(1);
     
    return {
      name: await this.root.locator('.cart_description').innerText(),
      price: parsePrice(await this.root.locator('.cart_price').innerText()),
      quantity: Number(await this.root.locator('.cart_quantity').innerText()),
      total: parsePrice(await this.root.locator('.cart_total').innerText()),
    };
  }
}
