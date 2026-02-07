import { CartPage } from "../pages/cart-page";
import { ProductsPage } from "../pages/products-page";

export class AddToCartFlow {
  constructor(
    private readonly productsPage: ProductsPage,
    private readonly cartPage: CartPage
  ) {}

  async addProduct (productName: string)  {
    await this.productsPage.navigateToProducts();
    await this.productsPage.searchForProduct(productName);
    await this.productsPage.addProductToCartByName(productName);
    await this.productsPage.viewCart();

    await this.cartPage.expectOpened();
  }
}
