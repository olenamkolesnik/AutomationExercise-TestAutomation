import { test } from '../../../../src/common/fixtures/index';
import { PaymentFlow } from '../../../../src/ui/flows/payment.flow';
import { CartPage } from '../../../../src/ui/pages/cart-page';
import { CheckoutPage } from '../../../../src/ui/pages/checkout-page';
import { PaymentPage } from '../../../../src/ui/pages/payment-page';
import { ProductsPage } from '../../../../src/ui/pages/products-page';
import { buildValidCard } from '../../../../src/ui/data/card-factory';
import { PaymentDonePage } from '../../../../src/ui/pages/payment-done-page';

test.describe('Payment Page - place order', () => {
 
  test('should place order', async ({ product, authPage }) => {
    const productsPage = new ProductsPage(authPage);
    const cartPage = new CartPage(authPage);
    const checkoutPage = new CheckoutPage(authPage);

    await new PaymentFlow(productsPage, cartPage, checkoutPage).placeOrder(product.name);

    const paymentPage = new PaymentPage(authPage);
    await paymentPage.expectPageOpened();

    const card = buildValidCard();
    await paymentPage.fillCardDetails(card);
    await paymentPage.submitCardDetails();
    
    const paymentDonePage = new PaymentDonePage(authPage);
    await paymentDonePage.expectOrderPlaced();
  });
});
