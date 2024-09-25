<template>
    <SearchBar @search="fetchProducts" />
    <div class="product-list">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div class="pagination">
      <button class="pagination-button" @click="prevPage" :disabled="page <= 1" :class="{ 'pagination-button--disabled': page <= 1 }">Previous</button>
      <button class="pagination-button" @click="nextPage">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useProductComposable } from '../composables/useProductComposable';
  import ProductItem from './ProductItem.vue';
  import SearchBar from './SearchBar.vue';
  
  const { products, page, fetchProducts, prevPage, nextPage } = useProductComposable();
  </script>
  
  <style lang="scss">
  @import '../styles/product.scss';
  </style>
  