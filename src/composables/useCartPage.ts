// src/composables/useCartPage.ts
import { ref, computed } from 'vue';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cartService';  
import { CartItem } from '../types/cartItem';
import { v4 as uuidv4 } from 'uuid';

export function useCartPage() {
  const cartId = ref(localStorage.getItem('cartId') || uuidv4());
  localStorage.setItem('cartId', cartId.value);  

  const cartItems = ref<CartItem[]>([]);  


  const loadCartItems = async () => {
    try {
      const items = await getCartItems(cartId.value); 
      cartItems.value = items;
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

 
  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const updatedItem = await updateCartItem(cartId.value, itemId, quantity);  
      const item = cartItems.value.find(i => i.id === itemId);
      if (item) {
        item.quantity = updatedItem.quantity;
        item.total_price = updatedItem.total_price;
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  
  const removeItem = async (itemId: number) => {
    try {
      await removeCartItem(cartId.value, itemId);  
      cartItems.value = cartItems.value.filter(item => item.id !== itemId);  
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };


  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      const productTotal = item.product.price * item.quantity;  
      return total + productTotal;  
    }, 0);
  });

  return {
    cartItems,
    loadCartItems,
    updateQuantity,
    removeItem,  
    cartTotal,
  };
}
