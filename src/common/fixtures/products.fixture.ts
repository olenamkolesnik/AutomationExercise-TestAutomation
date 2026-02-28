import { test as base } from './api-clients.fixture';
import { assertProductsListDto } from '../../api/contracts/guards/productsList.guard';
import { Product } from '../../common/models/product/product.model';
import { mapApiProductToModel } from '../models/product/product.mapper';

export const test = base.extend<{
  product: Product;
}>({
  product: async ({ productClient }, use) => {
    const response = await productClient.getProductsList();
     if (!response.data) {
      throw new Error('Products response has no data');
    }
    assertProductsListDto(response.data);
    const product = mapApiProductToModel(response.data[0]);
/*
    const dto = response.data[0];
    if (!dto) {
      throw new Error('No product found');
    }

    const product: Product = {
      id: dto.id,
      name: dto.name,
      price: parsePrice(dto.price),
    };*/

    await use(product);
  },
});
