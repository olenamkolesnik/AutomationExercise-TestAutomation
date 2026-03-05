import { ProductDto } from '../dto/product.dto';
import { productSchema, productsListSchema } from '../schemas/product.schema';
import ajv from './ajv.instance';

export const validateProduct = ajv.compile<ProductDto>(productSchema);
export const validateProductsList = ajv.compile<ProductDto[]>(productsListSchema);