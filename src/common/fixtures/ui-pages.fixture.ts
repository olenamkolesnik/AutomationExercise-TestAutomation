import { AccountCreatedPage } from '../../ui/pages/account-created-page';
import { CartPage } from '../../ui/pages/cart-page';
import { CheckoutPage } from '../../ui/pages/checkout-page';
import {HomePage} from '../../ui/pages/home-page';
import {LoginPage} from '../../ui/pages/login-page';
import { PaymentDonePage } from '../../ui/pages/payment-done-page';
import { PaymentPage } from '../../ui/pages/payment-page';
import { ProductsPage } from '../../ui/pages/products-page';
import { SignupPage } from '../../ui/pages/signup-page';
import { test as base } from './auth-user.fixture';

type UiPageFixtures = {
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
  loginPage: LoginPage;
  homePage: HomePage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
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

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
});
