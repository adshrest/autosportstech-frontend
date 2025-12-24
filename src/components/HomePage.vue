<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-if="news.length === 0">No news available today.</div>

      <div v-else>
        <div v-for="sport in sports" :key="sport" class="sport-section">
          <h2>{{ sport }}</h2>
          <div class="news-list">
            <div
              v-for="(item, index) in groupedNews[sport]"
              :key="index"
              class="news-item"
            >
              <a :href="item.url" target="_blank">
                <img v-if="item.image" :src="item.image" alt="News Image" />
                <h3>{{ item.title }}</h3>
              </a>
            </div>
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
      news: [],
      loading: true,
      sports: ["Football", "Cricket", "Basketball", "Tennis", "Others"],
      groupedNews: {},
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

        // Group news by sport
        const grouped = {};
        this.sports.forEach((sport) => {
          grouped[sport] = this.news.filter((n) => n.sport === sport);
        });
        this.groupedNews = grouped;
      } catch (error) {
        console.error("Error fetching news:", error);
        this.news = [];
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchNews();
    setInterval(this.fetchNews, 60 * 60 * 1000); // refresh hourly
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.sport-section {
  margin-bottom: 40px;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.news-item {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
  padding: 10px;
  background: #f9f9f9;
  transition: transform 0.2s;
}

.news-item:hover {
  transform: scale(1.03);
}

.news-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.news-item h3 {
  font-size: 16px;
  margin: 10px 0 0;
}
</style>
