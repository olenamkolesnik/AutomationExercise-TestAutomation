import AuthClient from '../../api/clients/auth-client';
import ProductsClient from '../../api/clients/products-client';
import UserClient from '../../api/clients/user-client';
import { test as base } from './infrastructure.fixture';

type ApiClients = {
  userClient: UserClient;
  productClient: ProductsClient;
  authClient: AuthClient;
};

export const test = base.extend<ApiClients>({
  userClient: async ({ request }, use) => {
    await use(new UserClient(request));
  },

  productClient: async ({ request }, use) => {
    await use(new ProductsClient(request));
  },

  authClient: async ({request}, use) => {
    await use(new AuthClient(request));
  }
});