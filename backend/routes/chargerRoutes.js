const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger
} = require('../controllers/chargerController');

router.use(auth); // protect all routes below

router.post('/', createCharger);
router.get('/', getAllChargers);
router.put('/:id', updateCharger);
router.delete('/:id', deleteCharger);

module.exports = router;
