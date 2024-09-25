<template>
  <header class="store-header">
    <h1 class="store-title">My Store</h1>
    <div class="cart-info">
      <span class="cart-count">{{ cartItemsCount }} Products</span>
      <button class="cart-button" @click="goToCart">
        🛒
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { onMounted, computed } from 'vue';

const cartStore = useCartStore();
const router = useRouter();

const cartItemsCount = computed(() => cartStore.cartItemsCount);

onMounted(() => {
  cartStore.loadCartItems();
});

const goToCart = () => {
  router.push('/cart');
};
</script>

<style lang="scss">
@import '../styles/header.scss';  
</style>
