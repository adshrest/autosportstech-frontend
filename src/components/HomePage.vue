<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching latest sports news...</div>

    <div v-else>
      <div v-for="(items, sport) in news" :key="sport" class="sport-section">
        <h2>{{ sport }}</h2>
        <div class="news-grid">
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
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      news: {},
      loading: true
    };
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true;
        const response = await axios.get(
          "https://autosportstech-backend.onrender.com/api/news"
        );
        this.news = response.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // Initial fetch
    this.fetchNews();
    // Refresh hourly (3600000ms)
    setInterval(() => this.fetchNews(), 60 * 60 * 1000);
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}

h1 {
  text-align: center;
  color: #222;
}

.sport-section {
  margin-bottom: 40px;
}

.sport-section h2 {
  color: #0077cc;
  border-bottom: 2px solid #0077cc;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.news-item {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.news-item:hover {
  transform: translateY(-3px);
}

.news-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.news-item h3 {
  font-size: 16px;
  margin: 10px 0 0;
  color: #333;
}
</style>
