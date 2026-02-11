import { Locator, expect } from '@playwright/test';
import { OrderSummaryUi } from '../models/order-summary.model';
import { parsePrice } from '../../common/utils/price-parser';

export class OrderSummaryComponent {
  constructor(private readonly root: Locator) {}

  async getData(): Promise<OrderSummaryUi> {
    await expect(this.root).toBeVisible();

    return { total: parsePrice(await this.root.locator('.cart_total_price').innerText()) };
  }
}
