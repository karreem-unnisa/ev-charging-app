<template>
  <div>
    <h1>Dashboard</h1>
    
    <!-- Charger Form -->
    <ChargerForm @charger-added="fetchChargers" />
    
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
  },
  mounted() {
    this.fetchChargers();
  },
};
</script>
