import { expect } from '@playwright/test';
import { ProductDto } from '../../api/models/dto/product-dto';
import { CartItemUi } from '../components/cart/cart-item.model';

export function assertCartItem(
  uiItem: CartItemUi,
  product: ProductDto,
  quantity: number,
) {
  const unitPrice = parsePrice(product.price);
  const uiUnitPrice = parsePrice(uiItem.price);
  const uiTotal = parsePrice(uiItem.total);

  const expectedTotal = unitPrice * quantity;

  expect(uiItem.name).toContain(product.name);
  expect(uiUnitPrice).toBe(unitPrice);
  expect(uiItem.quantity).toBe(quantity.toString());
  expect(uiTotal).toBe(expectedTotal);
  
  function parsePrice(value: string): number {
    return Number(value.replace(/[^\d]/g, ''));
  }
}
