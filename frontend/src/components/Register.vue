<template>
  <div class="register-container">
  <h1>Charge Up</h1>
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
    <p class="login-link">
      Already have an account?
      <router-link to="/login">Login</router-link>
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
    async register() {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
          email: this.email,
          password: this.password
        })
        alert('Registration successful! Now login.')
        this.$router.push('/login')
      } catch (err) {
        alert('Registration failed: ' + (err.response?.data?.message || err.message))
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 10vh auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background: white;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.register-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.register-form button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #27ae60;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-form button:hover {
  background-color: #1e874b;
}

.login-link {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.login-link a {
  color: #27ae60;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
