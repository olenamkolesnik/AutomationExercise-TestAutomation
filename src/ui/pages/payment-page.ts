import { expect, Page } from '@playwright/test';

import { Card } from '../models/card.model';
import { BasePage } from './base-page';

export class PaymentPage extends BasePage {
  private readonly paymentForm = this.page.locator('#payment-form');
  private readonly nameOnCard = this.paymentForm.locator(
    'input[name="name_on_card"]',
  );
  private readonly cardNumber = this.paymentForm.locator(
    'input[name="card_number"]',
  );
  private readonly cvc = this.paymentForm.locator('input[name="cvc"]');
  private readonly expirationMonth = this.paymentForm.locator(
    'input[name="expiry_month"]',
  );
  private readonly expirationYear = this.paymentForm.locator(
    'input[name="expiry_year"]',
  );

  private readonly payAndConfirmOrderButton = this.paymentForm.getByRole(
    'button',
    { name: 'Pay and Confirm Order' },
  );

  constructor(page: Page) {
    super(page);
  }

  async expectPageOpened() {
    await expect(this.page).toHaveURL(/\/payment/);
    await expect(this.cardNumber).toBeVisible();
  }

  async fillCardDetails(card: Card): Promise<void> {
    await this.nameOnCard.fill(card.nameOnCard);
    await this.cardNumber.fill(card.cardNumber);
    await this.cvc.fill(card.cvc);
    await this.expirationMonth.fill(card.expirationMonthMM);
    await this.expirationYear.fill(card.expirationYearYYYY.toString());
  }

  async submitCardDetails(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/payment_done/),
      this.payAndConfirmOrderButton.click(),
    ]);
  }
}
