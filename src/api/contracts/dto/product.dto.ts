import { CategoryDto } from './category.dto';

export interface ProductDto {
  readonly id: number;
  readonly name: string;
  readonly price: string; // API contract: "Rs. 500"
  readonly brand: string;
  readonly category: CategoryDto;
}
