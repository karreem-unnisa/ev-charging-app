<template>
  <div>
    <h2>All Chargers</h2>

    <!-- Filters -->
    <div>
      <label>Status:</label>
      <select v-model="filters.status">
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <label>Connector:</label>
      <select v-model="filters.connectorType">
        <option value="">All</option>
        <option value="Type1">Type1</option>
        <option value="Type2">Type2</option>
      </select>
    </div>

    <!-- Charger List -->
    <div v-if="filteredChargers.length === 0">No chargers found.</div>

    <ul>
      <li v-for="(charger, index) in filteredChargers" :key="charger._id">
        <div v-if="editIndex === index">
          <!-- Edit Mode -->
          <input v-model="editForm.name" />
          <input v-model.number="editForm.location.latitude" type="number" step="0.0001" />
          <input v-model.number="editForm.location.longitude" type="number" step="0.0001" />

          <select v-model="editForm.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input v-model.number="editForm.powerOutput" />
          <select v-model="editForm.connectorType">
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
          </select>
          <button @click="saveEdit(charger._id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else>
          <!-- View Mode -->
          <strong>{{ charger.name }}</strong><br />
          Power: {{ charger.powerOutput }} kW<br />
          Status: {{ charger.status }}<br />
          Connector: {{ charger.connectorType }}<br />
          <button @click="editCharger(index, charger)">Edit</button>
          <button @click="deleteCharger(charger._id)">Delete</button>
        </div>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['chargers'],
  data() {
    return {
      filters: {
        status: '',
        connectorType: ''
      },
      editIndex: null,
      editForm: {},
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL // <-- your backend URL here
    }
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter(c => {
        const statusMatch = this.filters.status ? c.status === this.filters.status : true
        const connectorMatch = this.filters.connectorType ? c.connectorType === this.filters.connectorType : true
        return statusMatch && connectorMatch
      })
    }
  },
  methods: {
    editCharger(index, charger) {
      this.editIndex = index
      this.editForm = JSON.parse(JSON.stringify(charger)) // deep copy to avoid binding issues
    },
    cancelEdit() {
      this.editIndex = null
      this.editForm = {}
    },
    async saveEdit(id) {
      try {
        await axios.put(
          `${this.apiBaseUrl}/api/chargers/${id}`,
          this.editForm,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        alert('Charger updated!')
        this.cancelEdit()
        this.$emit('charger-deleted') // triggers re-fetch of chargers
      } catch (err) {
        alert('Update failed: ' + (err.response?.data?.message || err.message))
      }
    },
    async deleteCharger(id) {
      if (!confirm('Delete this charger?')) return
      try {
        await axios.delete(`${this.apiBaseUrl}/api/chargers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.$emit('charger-deleted')
      } catch (err) {
        alert('Delete failed')
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 14px;
}

div > label {
  margin-right: 8px;
  font-weight: 600;
}

div > select {
  margin-right: 16px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

li {
  background: white;
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

li > div {
  margin-bottom: 6px;
}

strong {
  font-size: 18px;
  color: #333;
}

button {
  margin-right: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

button:first-of-type {
  background-color: #28a745; /* green for edit */
  color: white;
}

button:last-of-type {
  background-color: #dc3545; /* red for delete */
  color: white;
}

button:hover {
  opacity: 0.9;
}

hr {
  border: none;
  border-top: 1px solid #eee;
  margin-top: 10px;
}
</style>
