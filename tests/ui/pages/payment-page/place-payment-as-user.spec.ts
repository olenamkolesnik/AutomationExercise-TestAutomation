import { test } from '../../../../src/common/fixtures/index';

test.describe('Payment Page - place order', () => {
  test('should place order', async ({
    paymentFlow,
    product,
    paymentPage,
    validCard,
    paymentDonePage,
  }) => {
    await paymentFlow.placeOrder(product.name);

    await paymentPage.expectPageOpened();
    await paymentPage.fillCardDetails(validCard);
    await paymentPage.submitCardDetails();

    await paymentDonePage.expectOrderPlaced();
  });
});
