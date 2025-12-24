<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-for="(items, sport) in news" :key="sport" class="sport-section">
        <h2>{{ sport }}</h2>
        <div v-if="items.length === 0">No news available.</div>

        <div v-else class="news-grid">
          <div v-for="(item, index) in items" :key="index" class="news-item">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              <img v-if="item.image" :src="item.image" :alt="item.title" />
              <h3>{{ item.title }}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  data() {
    return {
      news: {},
      loading: true
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
        this.news = {
          "Error": [{ title: "Could not fetch news", link: "#", image: null }]
        }
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchNews()
    setInterval(() => {
      this.fetchNews()
    }, 60 * 60 * 1000) // refresh hourly
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.sport-section {
  margin-bottom: 40px;
}

.news-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.news-item {
  width: 250px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  transition: transform 0.2s;
}

.news-item:hover {
  transform: scale(1.02);
}

.news-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.news-item h3 {
  font-size: 16px;
  margin-top: 10px;
}
</style>
