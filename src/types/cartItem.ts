import { Product } from './product';

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  product: Product; 
}
