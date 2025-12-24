<template>
  <div class="home">
    <h1>Autosports Tech</h1>

    <div v-if="loading">Fetching backend data...</div>

    <div v-else>
      <!-- Trending News -->
      <div v-if="trending.length">
        <h2>Trending News</h2>
        <ul>
          <li v-for="(item, index) in trending" :key="index" class="news-item">
            <a :href="item.link" target="_blank">
              <img v-if="item.image" :src="item.image" class="news-image"/>
              <h3>{{ item.title }}</h3>
            </a>
            <p v-if="item.content">{{ item.content }}</p>
          </li>
        </ul>
      </div>

      <!-- Latest News -->
      <div v-if="latest.length">
        <h2>Latest News</h2>
        <ul>
          <li v-for="(item, index) in visibleLatest" :key="index" class="news-item">
            <a :href="item.link" target="_blank">
              <img v-if="item.image" :src="item.image" class="news-image"/>
              <h3>{{ item.title }}</h3>
            </a>
            <p v-if="item.content">{{ item.content }}</p>
          </li>
        </ul>

        <!-- Load More button -->
        <button v-if="visibleLatest.length < latest.length" @click="loadMore">
          Load More
        </button>
      </div>

      <div v-if="trending.length === 0 && latest.length === 0">
        No news available today.
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
      trending: [],
      latest: [],
      visibleLatest: [],
      latestBatch: 10,   // number of latest news to show per batch
      loading: true,
    }
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true
        const response = await axios.get('https://autosportstech-backend.onrender.com/api/news')
        this.trending = response.data.trending || []
        this.latest = response.data.latest || []
        this.visibleLatest = this.latest.slice(0, this.latestBatch)
      } catch (error) {
        console.error('Error fetching news:', error)
        this.trending = [{ title: 'Error', content: '', link: '#' }]
        this.latest = [{ title: 'Error', content: '', link: '#' }]
        this.visibleLatest = this.latest.slice(0, this.latestBatch)
      } finally {
        this.loading = false
      }
    },
    loadMore() {
      const nextBatch = this.visibleLatest.length + this.latestBatch
      this.visibleLatest = this.latest.slice(0, nextBatch)
    }
  },
  mounted() {
    this.fetchNews()

    // Refresh news every hour (3600000 ms)
    setInterval(() => {
      this.fetchNews()
    }, 60 * 60 * 1000)
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
  margin: 0;
}

.news-item p {
  margin: 5px 0;
}

.news-image {
  max-width: 200px;
  display: block;
  margin-bottom: 5px;
}

button {
  padding: 10px 15px;
  margin: 15px 0;
  font-size: 14px;
  cursor: pointer;
}
</style>
