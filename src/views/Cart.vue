<template>
    <div class="cart-container">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="cart-item__details">
            <p class="product-name">{{ item.product.name }}</p>
            <p class="product-price">{{ Number(item.product.price).toFixed(2) }} $</p>
          </div>
          <div class="cart-item__controls">
            <select v-model.number="item.quantity" @change="updateItemQuantity(item)">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
            <button @click="removeItemFromCart(item.id)">Eliminar</button>
          </div>
          <p class="subtotal">Subtotal: {{ (Number(item.product.price) * item.quantity).toFixed(2) }} $</p>
        </div>
        <h2 class="cart-total">Total: {{ Number(cartTotal).toFixed(2) }} $</h2>
      </div>
      <div v-else>
        <p>Your cart is empty</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCartPage } from '../composables/useCartPage';
  import { onMounted } from 'vue';
  
  const { cartItems, loadCartItems, updateQuantity, removeItem, cartTotal } = useCartPage();
  

  onMounted(() => {
    loadCartItems();
  });

  const updateItemQuantity = (item: { id: number; quantity: number; }) => {
    updateQuantity(item.id, item.quantity);
  };
  

  const removeItemFromCart = (itemId: number) => {
    removeItem(itemId);
  };
  </script>
  
  <style lang="scss">
  @import '../styles/cart.scss';  
  </style>
  