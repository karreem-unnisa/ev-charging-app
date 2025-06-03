<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        // Use backend URL from env variable
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        alert('Login failed: ' + (err.response?.data?.message || err.message))
      }
    }
  }
}
</script>
