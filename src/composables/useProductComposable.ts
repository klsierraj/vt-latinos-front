import { ref, onMounted } from 'vue';
import { getProducts } from '../services/productService';
import { Product } from '../types/product';

export function useProductComposable() {
  const products = ref<Product[]>([]);  
  const page = ref(1);  
  const totalPages = ref(1);  
  const searchQuery = ref('');  


  const fetchProducts = async (query = '', currentPage = 1) => {
    try {
      const response = await getProducts(query, currentPage);
      products.value = response.data;  
      page.value = response.current_page;  
      totalPages.value = response.last_page; 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

 
  onMounted(() => {
    fetchProducts();  
  });


  const prevPage = () => {
    if (page.value > 1) {
      fetchProducts(searchQuery.value, page.value - 1);
    }
  };


  const nextPage = () => {
    if (page.value < totalPages.value) {
      fetchProducts(searchQuery.value, page.value + 1);
    }
  };

  return {
    products,
    page,
    totalPages,
    fetchProducts,
    prevPage,
    nextPage,
  };
}
