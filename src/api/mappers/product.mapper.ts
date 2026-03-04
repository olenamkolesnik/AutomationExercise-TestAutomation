import { ProductDto } from "../contracts/dto/product.dto";
import { Product } from "../../common/models/product/product.model";
import { parsePrice } from "../../common/utils/price-parser";

export function mapApiProductToModel(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: parsePrice(dto.price),
  };
}