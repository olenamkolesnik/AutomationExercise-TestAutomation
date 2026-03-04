import { JSONSchemaType } from 'ajv';
import { ProductDto } from '../dto/product.dto';
import { CategoryDto } from '../dto/category.dto';
import { UserTypeDto } from '../dto/user-type.dto';

export const userTypeSchema: JSONSchemaType<UserTypeDto> = {
  type: 'object',
  required: ['usertype'],
  properties: {
    usertype: { type: 'string', enum: ['Women', 'Men', 'Kids'] },
  },
  additionalProperties: false,
};

export const categorySchema: JSONSchemaType<CategoryDto> = {
  type: 'object',
  required: ['usertype', 'category'],
  properties: {
    usertype: userTypeSchema,
    category: { type: 'string' },
  },
  additionalProperties: false,
};
export const productSchema: JSONSchemaType<ProductDto> = {
  type: 'object',
  required: ['id', 'name', 'price', 'brand', 'category'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    price: { type: 'string' },
    brand: { type: 'string' },
    category: categorySchema,
  },
  additionalProperties: true,
};

export const productsListSchema: JSONSchemaType<ProductDto[]> = {
  type: 'array',
  items: productSchema,
};