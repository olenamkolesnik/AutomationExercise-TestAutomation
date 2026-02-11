import { test } from '../../../../src/common/fixtures/index';
import { assertCartItem } from '../../../../src/ui/assertions/assert-cart-item';
import { assertOrderSummary } from '../../../../src/ui/assertions/assert-order-summary';
import { CheckoutFlow } from '../../../../src/ui/flows/checkout.flow';
import { CartPage } from '../../../../src/ui/pages/cart-page';
import { CheckoutPage } from '../../../../src/ui/pages/checkout-page';
import { ProductsPage } from '../../../../src/ui/pages/products-page';

test.describe('Cart Page - proceed to checkout', () => {
  test('should checkout the cart', async ({ product, authPage }) => {
    const productsPage = new ProductsPage(authPage);
    const cartPage = new CartPage(authPage);

    await new CheckoutFlow(productsPage, cartPage).checkout(product.name);

    const checkoutPage = new CheckoutPage(authPage);
    await checkoutPage.expectPageOpened();

    const item = await(await checkoutPage.getCartItemByName(product.name)).getData();

    const summary = await checkoutPage.getOrderSummary().getData();

    assertCartItem(item, product, 1);
    assertOrderSummary(summary, product.price);
  });
});