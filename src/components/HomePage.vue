<template>
  <div class="container">
    <h1>SportsRead</h1>

    <div v-for="(items, sport) in groupedNews" :key="sport" v-if="items.length">
      <h2>{{ sport }}</h2>

      <div class="grid">
        <a
          v-for="(item, i) in items"
          :key="i"
          :href="item.url"
          target="_blank"
          class="card"
        >
          <img v-if="item.image" :src="item.image" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </a>
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
      news: []
    }
  },
  computed: {
    groupedNews() {
      const groups = {
        Football: [],
        Soccer: [],
        Cricket: [],
        Basketball: [],
        Tennis: [],
        Others: []
      }

      this.news.forEach(n => {
        if (groups[n.sport]) groups[n.sport].push(n)
        else groups.Others.push(n)
      })

      return groups
    }
  },
  async mounted() {
    await this.fetchNews()
    setInterval(this.fetchNews, 60 * 60 * 1000) // hourly
  },
  methods: {
    async fetchNews() {
      const res = await axios.get(
        "https://autosportstech-backend.onrender.com/api/news"
      )
      this.news = res.data
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial;
}

h1 {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.card {
  text-decoration: none;
  color: black;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  background: #fff;
}

.card:hover {
  background: #f5f5f5;
}

img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
