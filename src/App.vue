<template>
  <div id="app">
    <h1>Autosports Dashboard</h1>

    <section>
      <h2>Matches</h2>
      <ul>
        <li v-for="match in matches" :key="match.id">{{ match.name }}</li>
      </ul>
    </section>

    <section>
      <h2>Teams</h2>
      <ul>
        <li v-for="team in teams" :key="team.id">{{ team.name }}</li>
      </ul>
    </section>

    <section>
      <h2>Players</h2>
      <ul>
        <li v-for="player in players" :key="player.id">{{ player.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { fetchData } from './api.js';

export default {
  data() {
    return {
      matches: [],
      teams: [],
      players: []
    };
  },
  async mounted() {
    this.matches = await fetchData('/matches');
    this.teams = await fetchData('/teams');
    this.players = await fetchData('/players');
  }
}
</script>

<style>
#app {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
  padding: 20px;
}

h1 {
  text-align: center;
}

section {
  margin-bottom: 30px;
}
</style>