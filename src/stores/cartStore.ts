import { defineStore } from 'pinia';
import { getCartItems, addToCart as addToCartAPI } from '../services/cartService';
import { v4 as uuidv4 } from 'uuid';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: localStorage.getItem('cartId') || uuidv4(),
    cartItems: [] as any[], 
    cartItemsCount: Number(localStorage.getItem('cartItemsCount')) || 0, 
  }),
  actions: {

    async loadCartItems() {
      try {
        const items = await getCartItems(this.cartId);
        this.cartItems = items;
        this.cartItemsCount = items.length;
        localStorage.setItem('cartItemsCount', String(this.cartItemsCount));
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    },

    async addToCart(productId: number, quantity: number) {
      const existingItem = this.cartItems.find(item => item.product_id === productId);

      try {
        if (existingItem && existingItem.quantity >= 10) {
          console.warn('Maximum quantity reached. You cannot add more than 10 items.');
          return;
        }

        if (existingItem) {
          const newQuantity = Math.min(existingItem.quantity + 1, 10); 
          await addToCartAPI(this.cartId, productId, newQuantity - existingItem.quantity); 
          existingItem.quantity = newQuantity;

        } else {
          const newItem = await addToCartAPI(this.cartId, productId, quantity);
          this.cartItems.push(newItem);
          this.cartItemsCount += 1; 
        }

        localStorage.setItem('cartItemsCount', String(this.cartItemsCount));
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    },
  },
});
