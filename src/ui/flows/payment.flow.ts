import { CheckoutPage } from '../pages/checkout-page';
import { CheckoutFlow } from './checkout.flow';

export class PaymentFlow {
  constructor(
    private readonly checkoutFlow : CheckoutFlow,
    private readonly checkoutPage : CheckoutPage
  ) {}

  async placeOrder(productName: string) : Promise<void>
  {
    await this.checkoutFlow.checkout(productName);

    await this.checkoutPage.clickPlaceOrder();
  }
}