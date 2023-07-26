import { UUID } from "crypto";

export interface ProductItem {
  id: UUID;
  name: string;
  price: number;
}
