<template>
  <div class="product-item">
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ Number(product.price).toFixed(2) }} $</p>
    <router-link :to="`/product/${product.id}`" class="details-link">View Details</router-link>
    <button class="add-to-cart-btn" @click="addToCart(product.id)" 
      :disabled="loading || quantityInCart >= 10">
      <span v-if="!loading">Add to Cart</span>
      <span v-else>Loading...</span>
    </button>
    <p v-if="quantityInCart >= 10" class="max-limit-msg">Only 10 units per product can be added.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { Product } from '../types/product';
import "../styles/product.scss"

const props = defineProps<{
  product: Product;
}>();

const loading = ref(false);
const cartStore = useCartStore();

const quantityInCart = computed(() => {
  const item = cartStore.cartItems.find(item => item.product_id === props.product.id);
  return item ? item.quantity : 0;
});

const addToCart = async (productId: number) => {
  if (quantityInCart.value >= 10) return;  

  loading.value = true;
  try {
    await cartStore.addToCart(productId, 1); 
  } catch (error) {
    console.error('Error adding to cart', error);
  } finally {
    loading.value = false;
  }
};
</script>

