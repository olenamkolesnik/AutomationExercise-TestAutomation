import { ProductDto } from "../../../api/contracts/dto/product-dto";
import { Product } from "./product.model";
import { parsePrice } from "../../utils/price-parser";

export function mapApiProductToModel(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: parsePrice(dto.price),
  };
}