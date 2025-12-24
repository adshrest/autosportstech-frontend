<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-for="(items, sport) in groupedNews" :key="sport" class="sport-section">
        <h2>{{ sport }}</h2>

        <div v-if="items.length === 0">No news available.</div>

        <ul v-else>
          <li v-for="item in items" :key="item.title" class="news-item">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">
              <h3>{{ item.title }}</h3>
              <p v-if="item.content">{{ item.content }}</p>
              <img v-if="item.image" :src="item.image" :alt="item.title" />
            </a>
          </li>
        </ul>
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
      news: [],
      loading: true,
    }
  },
  computed: {
    groupedNews() {
      const groups = {}
      // Group news by sport
      this.news.forEach(item => {
        const sport = item.sport || 'Others'
        if (!groups[sport]) groups[sport] = []
        groups[sport].push(item)
      })
      return groups
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
          { title: 'Error', content: 'Could not fetch news. Please try again later.', url: '#' }
        ]
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    // Fetch news immediately
    this.fetchNews()

    // Refresh every hour (3600000 ms)
    setInterval(() => {
      this.fetchNews()
    }, 3600000)
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.sport-section {
  margin-bottom: 30px;
}

.news-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.news-item h3 {
  margin: 0 0 5px 0;
  font-size: 1.2em;
}

.news-item p {
  margin: 0 0 5px 0;
}

.news-item img {
  max-width: 100%;
  height: auto;
  margin-top: 5px;
  border-radius: 5px;
}
</style>
