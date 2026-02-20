import { test } from '../../../../src/common/fixtures/index';
import { assertCartItem } from '../../../../src/ui/assertions/assert-cart-item';
import { assertDeliveryAddress } from '../../../../src/ui/assertions/assert-delivery-address';
import { assertOrderSummary } from '../../../../src/ui/assertions/assert-order-summary';

test.describe('Cart Page - proceed to checkout', () => {
  test('should checkout the cart', async ({ checkoutFlow, product, checkoutPage, testUser }) => {   
    await checkoutFlow.checkout(product.name);
    await checkoutPage.expectPageOpened();

    const cartItemComponent = await checkoutPage.getCartItemByName(
      product.name,
    );
    const item = await cartItemComponent.getData();
    assertCartItem(item, product, 1);

    const summary = await checkoutPage.getOrderSummary().getData();
    assertOrderSummary(summary, product.price);

    const deliveryAddress = await checkoutPage.getDeliveryAddress().getData();
    assertDeliveryAddress(deliveryAddress, testUser);

    const invoiceAddress = await checkoutPage.getInvoiceAddress().getData();
    assertDeliveryAddress(invoiceAddress, testUser);
  });
  
});
