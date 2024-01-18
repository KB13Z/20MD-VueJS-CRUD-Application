<script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';

  interface Fruit {
    id: number;
    image: string;
    name: string;
  }

  const getLocalStorageData = () => {
    const storedData = localStorage.getItem('fruits');
    return storedData ? JSON.parse(storedData) : null;
  };

  const fruits = ref<Fruit[]>(getLocalStorageData() || []);

  const saveToLocalStorage = (data: Fruit[]) => {
    localStorage.setItem('fruits', JSON.stringify(data));
  };

  const fetchFruits = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fruits');
      fruits.value = response.data.reverse();
      saveToLocalStorage(fruits.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMounted(() => {
    fetchFruits();
  });

  const currentPage = ref(1);
  const perPage = 6;

  const paginatedFruits = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return fruits.value.slice(start, end);
  });

  const totalPages = computed(() => Math.ceil(fruits.value.length / perPage));

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
</script>

<template>
  <div class="homeview">
    <div class="posts-container">
      <div class="post" v-for="fruit in paginatedFruits" :key="fruit.id">
        <img :src="fruit.image" alt="Fruit image" class="fruit-image" />
        <h3 class="fruit-name">{{ fruit.name }}</h3>
        <div class="link-wrapper">
          <router-link :to="{ name: 'fruit', params: { id: fruit.id } }" class="post-link">Learn more →</router-link>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button v-if="currentPage > 1" type="button" class="pagination-button" @click="prevPage">Previous</button>
      <span class="pagination-text">Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" type="button" class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
  .homeview {
    margin-top: 8rem;
    margin-bottom: 5rem;
  }
  .posts-container {
    width: 100%;
    padding: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .post {
    padding: 2rem;
    border: 2px solid purple;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .fruit-image {
    width: 300px;
    height: 200px;
    border-radius: 15px;
  }

  .fruit-name {
    font-weight: bold;
  }

  .link-wrapper {
    width: 100%;
    text-align: end;
    margin-top: 1rem;
  }

  .post-link {
    text-decoration: none;
    color: purple;
    font-style: italic;
  }

  .post-link:hover {
    font-weight: bold;
    transition: 0.2s;
  }

  .pagination {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .pagination-button {
    padding: 0.5rem;
    border: 1px solid purple;
    border-radius: 15px;
    background-color: white;        
    color: purple;
    font-weight: bold;
    font-style: italic;
  }

  .pagination-button:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.4s;
  }

  .pagination-text {
    padding-right: 1rem;
    padding-left: 1rem;
  }
</style>
