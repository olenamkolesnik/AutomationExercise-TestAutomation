import { ProductDto } from '../../api/models/dto/product-dto';

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: 'Rs';
  brand: string;
  category: string;
  userType: string;
}

export function mapProductDto(dto: ProductDto): Product {
  const [, currency, amount] = dto.price.match(/(\D+)\s*(\d+)/)!;

  return {
    id: dto.id,
    name: dto.name,
    price: Number(amount),
    currency: currency.trim() as 'Rs',
    brand: dto.brand,
    category: dto.category.category,
    userType: dto.category.usertype.usertype,
  };
}

