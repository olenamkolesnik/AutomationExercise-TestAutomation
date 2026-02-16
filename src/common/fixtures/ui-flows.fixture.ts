import { test as pages } from './ui-pages.fixture';
import { AddToCartFlow } from '../../ui/flows/add-to-cart.flow';
import { CheckoutFlow } from '../../ui/flows/checkout.flow';
import { PaymentFlow } from '../../ui/flows/payment.flow';

type UiFlowFixtures = {
  addToCartFlow: AddToCartFlow;
  checkoutFlow: CheckoutFlow;
  paymentFlow: PaymentFlow;
};

export const test = pages.extend<UiFlowFixtures>({
  addToCartFlow: async ({ productsPage, cartPage }, use) => {
    await use(new AddToCartFlow(productsPage, cartPage));
  },

  checkoutFlow: async ({ addToCartFlow, cartPage }, use) => {
    await use(new CheckoutFlow(addToCartFlow, cartPage));
  },

  paymentFlow: async ({ checkoutFlow, checkoutPage }, use) => {
    await use(new PaymentFlow(checkoutFlow, checkoutPage));
  },
});
