<template>
  <div class="home">
    <h1>SportsRead</h1>
    <div v-if="loading">Fetching backend data...</div>
    <div v-else>
      <div v-for="(items, sport) in news" :key="sport" class="sport-group" v-if="sport !== 'last_updated'">
        <h2>{{ sport }}</h2>
        <ul>
          <li v-for="(item, index) in items" :key="index" class="news-item">
            <a :href="item.link" target="_blank">
              <img v-if="item.image" :src="item.image" alt="image" class="news-image"/>
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="last-updated">
        Last updated: {{ news.last_updated }}
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
      news: {},
      loading: true
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
        this.news = {
          Football: [{ title: "Error fetching news", link: "", sport: "Football", image: null }],
          Cricket: [{ title: "Error fetching news", link: "", sport: "Cricket", image: null }],
          Basketball: [{ title: "Error fetching news", link: "", sport: "Basketball", image: null }],
          Tennis: [{ title: "Error fetching news", link: "", sport: "Tennis", image: null }],
          Others: [{ title: "Error fetching news", link: "", sport: "Others", image: null }]
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
    }, 60 * 60 * 1000) // hourly
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.sport-group {
  margin-bottom: 30px;
}

.news-item {
  margin-bottom: 10px;
  list-style: none;
}

.news-item a {
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
}

.news-item a:hover {
  color: #007BFF;
}

.news-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
}

.last-updated {
  margin-top: 20px;
  font-size: 12px;
  color: gray;
}
</style>
