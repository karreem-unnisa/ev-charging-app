<template>
  <div id="map" style="height: 500px; width: 100%; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></div>
</template>

<script>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default {
  name: 'ChargerMap',
  props: ['chargers'],
  mounted() {
    // Fix icon path
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    })

    const map = L.map('map').setView([12.9716, 77.5946], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    this.chargers.forEach(charger => {
      if (charger.location && charger.location.latitude && charger.location.longitude) {
        const marker = L.marker([charger.location.latitude, charger.location.longitude]).addTo(map)
        marker.bindPopup(`
          <strong>${charger.name}</strong><br>
          Power: ${charger.powerOutput} kW<br>
          Status: ${charger.status}<br>
          Connector: ${charger.connectorType}
        `)
      }
    })
  }
}

</script>
