import { CartPage } from '../pages/cart-page';
import { ProductsPage } from '../pages/products-page';
import { AddToCartFlow } from './add-to-cart.flow';

export class CheckoutFlow {
  constructor(
    private readonly productsPage: ProductsPage,
    private readonly cartPage: CartPage,
  ) {}

  async checkout(productName: string) {
    await new AddToCartFlow(this.productsPage, this.cartPage).addProduct(productName);
    await this.cartPage.proceedToCheckout();
  }
}