<template>
  <div class="home">
    <h1>SportsRead</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <div v-if="Object.keys(groupedNews).length === 0">
        No news available today.
      </div>

      <div v-else>
        <div
          v-for="(items, sport) in groupedNews"
          :key="sport"
          class="sport-section"
        >
          <h2>{{ sport }}</h2>
          <ul>
            <li v-for="item in items" :key="item.title" class="news-item">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <img v-if="item.image" :src="item.image" :alt="item.title" />
                <h3>{{ item.title }}</h3>
                <p>{{ item.content }}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage", // Multi-word to satisfy ESLint
  data() {
    return {
      news: [],
      loading: true,
    };
  },
  computed: {
    groupedNews() {
      // Group by sport type, minor sports go into "Others"
      const groups = {};
      this.news.forEach((item) => {
        const sport = ["Football", "Soccer", "Cricket", "Basketball", "Tennis"].includes(item.sport)
          ? item.sport
          : "Others";
        if (!groups[sport]) groups[sport] = [];
        groups[sport].push(item);
      });
      return groups;
    },
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
        this.news = [];
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchNews();

    // Refresh every hour
    setInterval(() => {
      this.fetchNews();
    }, 60 * 60 * 1000);
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

.news-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  list-style: none;
}

.news-item img {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin-bottom: 5px;
}

.news-item h3 {
  margin: 0 0 5px 0;
  font-size: 1.1em;
  color: #007bff;
}

.news-item p {
  margin: 0;
  font-size: 0.95em;
  color: #333;
}

.news-item a {
  text-decoration: none;
}

.news-item a:hover h3 {
  text-decoration: underline;
}
</style>
