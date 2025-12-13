// controllers/facultyController.js
const FacultyStats = require('../models/FacultyStats');

// Get KPIs
exports.getStats = async (req, res) => {
  try {
    // We expect a single doc. If none, return zeros.
    let stats = await FacultyStats.findOne();
    if (!stats) {
      stats = new FacultyStats();
      await stats.save();
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update KPIs (PUT)
exports.updateStats = async (req, res) => {
  try {
    let stats = await FacultyStats.findOne();
    if (!stats) {
      stats = new FacultyStats(req.body);
      await stats.save();
      return res.json(stats);
    }
    Object.assign(stats, req.body);
    await stats.save();
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
