import { CartPage } from '../pages/cart-page';
import { AddToCartFlow } from './add-to-cart.flow';

export class CheckoutFlow {
  constructor(
    private readonly addToCartFlow: AddToCartFlow,
    private readonly cartPage: CartPage,
  ) {}

  async checkout(productName: string) {
    await this.addToCartFlow.addProduct(productName);
    await this.cartPage.proceedToCheckout();
  }
}
