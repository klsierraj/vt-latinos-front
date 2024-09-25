<template>
    <div class="product-details" v-if="product">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ product.price }} $</p>
    </div>
    <div v-else-if="loading" class="loading-message">Loading product details...</div>
    <div v-else class="error-message">Failed to load product details.</div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getProductById } from '../services/productService';
  import { Product } from '../types/product';
  import "../styles/product-detail.scss"
  const route = useRoute();
  const productId = Number(route.params.id);  
  
  const product = ref<Product | null>(null);  
  const loading = ref(true); 

  const fetchProductDetails = async () => {
    try {
      const fetchedProduct = await getProductById(productId);
      product.value = fetchedProduct; 
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchProductDetails();  
  });
  
  </script>
  
