import ajv from './ajv.instance';
import { productSchema, productsListSchema } from '../schemas/product.schema';
import { ProductDto } from '../dto/product.dto';

export const validateProduct = ajv.compile<ProductDto>(productSchema);
export const validateProductsList = ajv.compile<ProductDto[]>(productsListSchema);