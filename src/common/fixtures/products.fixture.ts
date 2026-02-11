import { test as base } from '@playwright/test';
import ProductsClient from '../../api/clients/products-client';
import { ProductDto } from '../../api/models/dto/product-dto';
import { assertProductsListDto } from '../../api/models/guards/productsList.guard';
import { parsePrice } from '../../common/utils/price-parser';
import { Product } from '../../ui/models/product.model';

export const test = base.extend<{
  product: Product;
}>({
  product: async ({ request }, use) => {
    const productsClient = new ProductsClient(request);
    const response = await productsClient.getProductsList();

    assertProductsListDto(response.data);

    const dto: ProductDto = response.data[0];
    if (!dto) {
      throw new Error('No product found');
    }

    const product: Product = {
      id: dto.id,
      name: dto.name,
      price: parsePrice(dto.price),
    };

    await use(product);
  },
});

export const expect = base.expect;
