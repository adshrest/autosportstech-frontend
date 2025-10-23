<template>
	<div>
		<h1>Welcome to Autosports Tech</h1>
		<p>Fetching backend data...</p>
		<ul>
			<li v-for="user in users" :key="user.id">{{ user.name }}</li>
		</ul>
	</div>
</template>

<script>
import { API_URL } from '../config.js'

export default {
	data() {
		return {
			users: []
		}
	},
	mounted() {
		fetch(`${API_URL}/users`) // replace /users with your backend route
			.then(res => res.json())
			.then(data => this.users = data)
			.catch(err => console.error(err))
	}
}
</script>
