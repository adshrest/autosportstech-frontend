<template>
  <div id="app">
    <h1>AutoSportsTech Daily Sports News</h1>
    <div v-if="news.length === 0">Loading news...</div>
    <div v-for="(item, index) in news" :key="index" class="news-card">
      <h2>{{ item.headline }}</h2>
      <p>{{ item.content }}</p>
      <small>{{ item.sport }} | {{ item.date }}</small>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      news: []
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/news')  // Backend endpoint
      .then(response => {
        this.news = response.data;
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.news-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  background-color: #f9f9f9;
}
</style>
