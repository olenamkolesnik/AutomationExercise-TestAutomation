import { test as base } from '@playwright/test';
import ProductsClient from '../../api/clients/products-client';
import { ProductDto } from '../../api/models/dto/product-dto';
import { assertProductsListDto } from '../../api/models/guards/productsList.guard';

export const test = base.extend<{
  product: ProductDto;
}>({
  product: async ({ request }, use) => {
    const productsClient = new ProductsClient(request);
    const response = await productsClient.getProductsList();
    assertProductsListDto(response.data);

    const product = response.data[0] as ProductDto;
    if (!product) {
      throw new Error('No product found');
    }

    await use(product);
  },
});

export const expect = base.expect;

