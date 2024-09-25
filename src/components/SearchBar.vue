<template>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        v-model="searchQuery"
        @input="onSearch"
        class="search-input"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const searchQuery = ref('');
  const emit = defineEmits(['search']);
  
  const onSearch = () => {
    emit('search', searchQuery.value);
  };
  </script>
  
  <style lang="scss">
  @import '../styles/searchbar.scss'; 
  </style>
  