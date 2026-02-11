import { expect } from '@playwright/test';
import { OrderSummaryUi } from '../models/order-summary.model';
export function assertOrderSummary(
  summary: OrderSummaryUi,
  expectedTotal: number
) {
  expect(summary.total).toBe(expectedTotal);
}

