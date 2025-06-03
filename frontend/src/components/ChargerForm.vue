<template>
  <div class="form-container">
    <h3>Add New Charger</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.name" placeholder="Charger Name" required />
      
      <select v-model="form.status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input v-model.number="form.powerOutput" placeholder="Power Output (kW)" type="number" required />

      <select v-model="form.connectorType">
        <option value="Type1">Type1</option>
        <option value="Type2">Type2</option>
      </select>

      <div id="map" class="map"></div>

      <p v-if="form.latitude && form.longitude">
        📍 Selected Location: {{ form.latitude }}, {{ form.longitude }}
      </p>

      <button type="submit">Add Charger</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default {
  data() {
    return {
      form: {
        name: '',
        latitude: '',
        longitude: '',
        status: 'Active',
        powerOutput: '',
        connectorType: 'Type1'
      },
      map: null,
      marker: null,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL
    }
  },
  mounted() {
    // Leaflet icon fix
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

    // Initialize map
    this.map = L.map('map').setView([12.9716, 77.5946], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map)

    // Handle map click
    this.map.on('click', this.onMapClick)
  },
  methods: {
    onMapClick(e) {
      const { lat, lng } = e.latlng
      this.form.latitude = lat.toFixed(6)
      this.form.longitude = lng.toFixed(6)

      if (this.marker) {
        this.marker.setLatLng([lat, lng])
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map)
      }
    },
    async handleSubmit() {
      try {
        if (!this.form.latitude || !this.form.longitude) {
          alert("Please select a location on the map.")
          return
        }

        const res = await axios.post(
          `${this.apiBaseUrl}/api/chargers`,
          {
            name: this.form.name,
            location: {
              latitude: this.form.latitude,
              longitude: this.form.longitude
            },
            status: this.form.status,
            powerOutput: this.form.powerOutput,
            connectorType: this.form.connectorType
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        alert('Charger added successfully!')
        this.$emit('charger-added')
        this.resetForm()
      } catch (err) {
        alert('Failed to add charger: ' + err.response?.data?.error || err.message)
      }
    },
    resetForm() {
      this.form = {
        name: '',
        latitude: '',
        longitude: '',
        status: 'Active',
        powerOutput: '',
        connectorType: 'Type1'
      }
      if (this.marker) {
        this.map.removeLayer(this.marker)
        this.marker = null
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  background: #fefefe;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 16px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input, select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

button {
  background-color: #007bff;
  color: white;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.map {
  height: 300px;
  width: 100%;
  border-radius: 8px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}
</style>
