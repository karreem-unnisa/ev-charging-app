<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
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
    async register() {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          email: this.email,
          password: this.password
        })
        alert('Registration successful! Now login.')
        this.$router.push('/login')
      } catch (err) {
        alert('Registration failed: ' + err.response?.data?.message)
      }
    }
  }
}
</script>
