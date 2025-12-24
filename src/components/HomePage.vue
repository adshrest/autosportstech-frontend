<template>
  <div class="home">
    <h1>Autosports Tech</h1>

    <!-- Main News -->
    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-if="news.length === 0">No news available today.</div>

      <ul v-else>
        <li v-for="(item, index) in news" :key="index" class="news-item">
          <h3>{{ item.title }}</h3>
          <p v-if="item.content">{{ item.content }}</p>
          <a v-if="item.url" :href="item.url" target="_blank">Read more</a>
        </li>
      </ul>
    </div>

    <!-- Trending News -->
    <div class="trending">
      <h2>Trending News</h2>
      <ul>
        <li v-for="(item, index) in trending" :key="index">
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  data() {
    return {
      news: [],
      trending: [],
      loading: true,
    }
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true
        const response = await axios.get('https://autosportstech-backend.onrender.com/api/news')
        this.news = response.data
      } catch (error) {
        console.error('Error fetching news:', error)
        this.news = [{ title: 'Error', content: 'Could not fetch news. Please try again later.', url: '#' }]
      } finally {
        this.loading = false
      }
    },
    async fetchTrending() {
      try {
        const response = await axios.get('https://autosportstech-backend.onrender.com/api/trending')
        this.trending = response.data
      } catch (err) {
        console.error('Error fetching trending news:', err)
        this.trending = [{ title: 'Error', url: '#' }]
      }
    }
  },
  mounted() {
    this.fetchNews()
    this.fetchTrending()

    // Refresh daily
    setInterval(() => {
      this.fetchNews()
      this.fetchTrending()
    }, 24 * 60 * 60 * 1000)
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.news-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.news-item h3 {
  margin: 0 0 5px 0;
}

.news-item p {
  margin: 0;
}

.trending {
  margin-top: 40px;
}

.trending ul {
  list-style: none;
  padding: 0;
}

.trending li {
  margin-bottom: 10px;
}
</style>
