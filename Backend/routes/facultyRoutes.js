// routes/facultyRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/facultyController');

router.get('/stats', ctrl.getStats);
router.put('/stats', ctrl.updateStats); // update kpis

module.exports = router;
