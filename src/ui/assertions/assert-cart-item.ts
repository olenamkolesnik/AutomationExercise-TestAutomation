import { expect } from '@playwright/test';

import { Product } from '../../common/models/product/product.model';
import { CartItemUi } from '../models/cart-item.model';

export function assertCartItem(
  uiItem: CartItemUi,
  product: Product,
  quantity: number,
) {
  const expectedTotal = product.price * quantity;

  expect(uiItem.name).toContain(product.name);
  expect(uiItem.price).toBe(product.price);
  expect(uiItem.quantity).toBe(quantity);
  expect(uiItem.total).toBe(expectedTotal);
}
