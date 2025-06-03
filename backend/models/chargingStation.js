const mongoose = require('mongoose');

const ChargingStationSchema = new mongoose.Schema({
  name: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  status: { type: String, enum: ['Active', 'Inactive'] },
  powerOutput: Number,
  connectorType: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ChargingStation', ChargingStationSchema);
