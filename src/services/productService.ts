import { BASE_URL } from '../config';
import { Product } from '../types/product';
import { PaginatedProducts } from '../types/paginatedProduct';


export const getProducts = async (searchTerm = '', page = 1): Promise<PaginatedProducts> => {
    try {
      const response = await fetch(`${BASE_URL}/products?search=${searchTerm}&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: PaginatedProducts = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
