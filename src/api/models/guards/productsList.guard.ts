import { ProductDto } from '../dto/product-dto';

export function assertProductsListDto(
  data: unknown
): asserts data is ProductDto[] {
  if (!Array.isArray(data)) {
    throw new Error('Products list response is not an array');
  }

  if (data.length === 0) {
    throw new Error('Products list is empty');
  }

  const first = data[0];

  if (
    typeof first !== 'object' ||
    first === null ||
    !('id' in first) ||
    !('name' in first) ||
    !('price' in first)
  ) {
    throw new Error('Invalid product structure');
  }
}
