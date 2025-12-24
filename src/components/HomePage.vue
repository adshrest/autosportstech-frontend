<template>
  <div class="home">
    <h1>Autosports Tech</h1>

    <div v-if="loading">Fetching latest sports news...</div>

    <div v-else>
      <h2>📰 Latest News</h2>

      <div v-for="(item, index) in news" :key="index" class="news-item">
        <h3>{{ item.title }}</h3>
        <p><strong>{{ item.category }}</strong></p>
        <p>{{ item.content }}</p>
        <a :href="item.link" target="_blank">Read full article</a>
      </div>

      <h2>🔥 Trending</h2>
      <ul>
        <li v-for="(item, index) in trending" :key="index">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
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
      loading: true
    }
  },
  async mounted() {
    await this.fetchNews()
    await this.fetchTrending()

    // Refresh once every 24 hours
    setInterval(() => {
      this.fetchNews()
      this.fetchTrending()
    }, 86400000)
  },
  methods: {
    async fetchNews() {
      try {
        const res = await axios.get(
          'https://autosportstech-backend.onrender.com/api/news'
        )
        this.news = res.data
      } catch {
        this.news = []
      } finally {
        this.loading = false
      }
    },
    async fetchTrending() {
      const res = await axios.get(
        'https://autosportstech-backend.onrender.com/api/trending'
      )
      this.trending = res.data
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.news-item {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

.news-item h3 {
  margin: 0;
}

a {
  color: #1e88e5;
  text-decoration: none;
}
</style>
