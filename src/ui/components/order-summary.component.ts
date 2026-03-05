import { expect,Locator } from '@playwright/test';

import { parsePrice } from '../../common/utils/price-parser';
import { OrderSummaryUi } from '../models/order-summary.model';

export class OrderSummaryComponent {
  constructor(private readonly root: Locator) {}

  async getData(): Promise<OrderSummaryUi> {
    await expect(this.root).toBeVisible();

    return { total: parsePrice(await this.root.locator('.cart_total_price').innerText()) };
  }
}
