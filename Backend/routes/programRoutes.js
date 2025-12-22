const express = require('express');
const router = express.Router();
const controller = require('../controllers/programController');

console.log("loadingoverview");

const ProgramEntry = require('../models/ProgramEntry');
router.get('/overview', controller.getOverviewStats);
router.post('/seed', controller.seedDemoData);



router.get('/', async (req, res) => {
  const data = await ProgramEntry.find().sort({ createdAt: -1 });
  res.json({ data });
});



router.post('/', async (req, res) => {
  try {
    const program = await ProgramEntry.create(req.body);
    res.status(201).json(program);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await ProgramEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ProgramEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
