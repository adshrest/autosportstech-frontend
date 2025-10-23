<template>
  <div class="home">
    <h1>Autosports Tech</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-if="news.length === 0">No news available today.</div>

      <ul v-else>
        <li v-for="(item, index) in news" :key="index" class="news-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage', // Multi-word component name to satisfy ESLint
  data() {
    return {
      news: [],
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
        this.news = [
          { title: 'Error', content: 'Could not fetch news. Please try again later.' }
        ]
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    // Fetch news immediately on load
    this.fetchNews()

    // Refresh news every 24 hours (86400000 ms)
    setInterval(() => {
      this.fetchNews()
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
</style>
