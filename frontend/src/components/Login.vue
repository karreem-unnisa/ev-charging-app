<template>
  <div class="login-container">
  <h1>Charge Up</h1>
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
    <p class="register-link">
      Don't have an account?
      <router-link to="/register">Register</router-link>
    </p>
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 10vh auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background: white;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.login-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.login-form button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #2f80ed;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #1c65c8;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.register-link a {
  color: #2f80ed;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
