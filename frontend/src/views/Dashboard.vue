<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard</h1>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <!-- Add Charger Button -->
    <button class="add-btn" @click="showForm = !showForm">
      {{ showForm ? 'Cancel' : '➕ Add Charger' }}
    </button>

    <!-- Charger Form (conditionally shown) -->
    <ChargerForm v-if="showForm" @charger-added="handleAdded" />

    <!-- Charger List -->
    <ChargerList :chargers="chargers" @charger-deleted="fetchChargers" />

    <!-- Map View -->
    <ChargerMap v-if="chargers.length" :chargers="chargers" />
  </div>
</template>

<script>
import ChargerList from '../components/ChargerList.vue';
import ChargerForm from '../components/ChargerForm.vue';
import ChargerMap from '../components/ChargerMap.vue';
import axios from 'axios';

export default {
  components: {
    ChargerList,
    ChargerForm,
    ChargerMap,
  },
  data() {
    return {
      chargers: [],
      showForm: false,
    };
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/chargers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.chargers = res.data;
      } catch (err) {
        alert('Could not load chargers.');
      }
    },
    handleAdded() {
      this.fetchChargers();
      this.showForm = false; // Auto-close form after successful add
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.fetchChargers();
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  color: #2c3e50;
}

.logout-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.add-btn {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #218838;
}

/* Responsive tweak */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-title {
    font-size: 1.5rem;
  }

  .logout-btn,
  .add-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
