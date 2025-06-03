const ChargingStation = require('../models/chargingStation');

const createCharger = async (req, res) => {
  try {
    const charger = new ChargingStation({ ...req.body, user: req.user.userId });
    const saved = await charger.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllChargers = async (req, res) => {
  try {
    const chargers = await ChargingStation.find({ user: req.user.userId });
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCharger = async (req, res) => {
  try {
    const updated = await ChargingStation.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCharger = async (req, res) => {
  try {
    await ChargingStation.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    res.json({ message: 'Charger deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger
};
