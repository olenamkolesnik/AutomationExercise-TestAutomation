import { test as base } from './auth-user.fixture';
import { ProductsPage } from '../../ui/pages/products-page';
import { CartPage } from '../../ui/pages/cart-page';
import { CheckoutPage } from '../../ui/pages/checkout-page';
import { PaymentPage } from '../../ui/pages/payment-page';
import { PaymentDonePage } from '../../ui/pages/payment-done-page';

type UiPageFixtures = {
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
};

export const test = base.extend<UiPageFixtures>({
  productsPage: async ({ authPage }, use) => {
    await use(new ProductsPage(authPage));
  },

  cartPage: async ({ authPage }, use) => {
    await use(new CartPage(authPage));
  },

  checkoutPage: async ({ authPage }, use) => {
    await use(new CheckoutPage(authPage));
  },

  paymentPage: async ({ authPage }, use) => {
    await use(new PaymentPage(authPage));
  },

  paymentDonePage: async ({ authPage }, use) => {
    await use(new PaymentDonePage(authPage));
  },
});
