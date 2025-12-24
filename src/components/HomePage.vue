<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-for="(items, sport) in groupedNews" :key="sport" class="sport-section">
        <h2>{{ sport }}</h2>
        <div v-if="items.length === 0">No news today.</div>
        <div v-else class="news-list">
          <div v-for="(item, index) in items" :key="index" class="news-item">
            <a :href="item.url" target="_blank" rel="noopener">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <img v-if="item.image" :src="item.image" alt="News image" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "HomePage",
  data() {
    return {
      news: [],
      loading: true
    }
  },
  computed: {
    groupedNews() {
      const grouped = {}
      this.news.forEach(item => {
        if (!item.sport) item.sport = "Others"
        if (!grouped[item.sport]) grouped[item.sport] = []
        grouped[item.sport].push(item)
      })
      return grouped
    }
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true
        const response = await axios.get("https://autosportstech-backend.onrender.com/api/news")
        this.news = response.data
      } catch (error) {
        console.error("Error fetching news:", error)
        this.news = []
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchNews()
    // refresh hourly
    setInterval(() => this.fetchNews(), 60 * 60 * 1000)
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

.news-list {
  display: flex;
  flex-direction: column;
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

.news-item img {
  max-width: 100%;
  margin-top: 5px;
}
</style>
