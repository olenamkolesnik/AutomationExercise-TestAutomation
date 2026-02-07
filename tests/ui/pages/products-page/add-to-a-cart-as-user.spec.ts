import { test } from '../../../../src/common/fixtures/products-fixture';
import { assertCartItem } from '../../../../src/ui/assertions/assert-cart-item';
import { AddToCartFlow } from '../../../../src/ui/flows/add-to-cart.flow';
import { CartPage } from '../../../../src/ui/pages/cart-page';
import { ProductsPage } from '../../../../src/ui/pages/products-page';

test.describe('Products Page - add to a cart as user', () => {
  test('should add a product to the cart', async ({ product, page }) => {
    await new AddToCartFlow(
      new ProductsPage(page),
      new CartPage(page),
    ).addProduct(product.name);

    const cartPage = new CartPage(page);
    const uiItem = await cartPage.getCartItemByName(product.name);
    assertCartItem(uiItem, product, 1);
  });
});
