import { test as base } from './api-clients.fixture';
import { Product } from '../../common/models/product/product.model';
import { validateProductsList } from '../../api/contracts/validators/product.validator';
import { mapApiProductToModel } from '../../api/mappers/product.mapper';

export const test = base.extend<{
  product: Product;
}>({
  product: async ({ productClient }, use) => {
    const response = await productClient.getProductsList();
     if (!response.data) {
      throw new Error('Products response has no data');
    }

    validateProductsList(response.data);

    const product = mapApiProductToModel(response.data[0]);

    await use(product);
  },
});
