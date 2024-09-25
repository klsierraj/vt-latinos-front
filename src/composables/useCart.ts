// src/composables/useCart.ts
import { ref } from 'vue';
import { addToCart as addToCartAPI, getCartItems } from '../services/cartService';
import { v4 as uuidv4 } from 'uuid';

export function useCart() {
  const cartId = ref(localStorage.getItem('cartId') || uuidv4());
  localStorage.setItem('cartId', cartId.value); 

  const cartItemsCount = ref(Number(localStorage.getItem('cartItemsCount')) || 0);

  const loadCartItems = async () => {
    try {
      const items = await getCartItems(cartId.value);
      cartItemsCount.value = items.length;
      localStorage.setItem('cartItemsCount', String(cartItemsCount.value));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      // Llamada al backend para agregar el producto al carrito
      await addToCartAPI(cartId.value, productId, quantity);

      // Actualiza el número de ítems en el carrito
      cartItemsCount.value += quantity;

      // Guarda el nuevo valor en localStorage
      localStorage.setItem('cartItemsCount', String(cartItemsCount.value));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return {
    cartItemsCount,
    addToCart,
    loadCartItems, // Función para cargar el número de ítems al iniciar la app
  };
}
