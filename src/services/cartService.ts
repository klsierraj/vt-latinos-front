import { BASE_URL } from "../config";
import { CartItem } from "../types/cartItem";


export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        'Cart-Id': cartId,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addToCart = async (cartId: string, productId: number, quantity: number): Promise<CartItem> => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cart-Id': cartId,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    const cartItem = await response.json();
    return cartItem;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (cartId: string, itemId: number, quantity: number): Promise<CartItem> => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cart-Id': cartId,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeCartItem = async (cartId: string, itemId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Cart-Id': cartId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
