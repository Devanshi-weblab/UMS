// controllers/programController.js
const ProgramEntry = require('../models/ProgramEntry');

// Create entry
exports.createEntry = async (req, res) => {
  try {
    const entry = new ProgramEntry(req.body);
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get list (search + filter + pagination)
exports.getEntries = async (req, res) => {
  try {
    const { q, status, university, page = 1, limit = 10, start, end } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (university) filter.university = university;
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { university: regex },
        { programs: regex },
        { responsiblePerson: regex },
        { issues: regex },
        { keyUpdates: regex }
      ];
    }
    if (start || end) {
      filter.deadline = {};
      if (start) filter.deadline.$gte = new Date(start);
      if (end) filter.deadline.$lte = new Date(end);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await ProgramEntry.countDocuments(filter);
    const data = await ProgramEntry.find(filter).sort({ deadline: 1 }).skip(skip).limit(Number(limit));
    res.json({ data, meta: { total, page: Number(page), limit: Number(limit) }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single
exports.getEntry = async (req, res) => {
  try {
    const entry = await ProgramEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateEntry = async (req, res) => {
  try {
    const updated = await ProgramEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteEntry = async (req, res) => {
  try {
    await ProgramEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
// Overview stats for pie chart & cards
exports.getOverviewStats = async (req, res) => {
  try {
    // total and counts for each status
    const total = await ProgramEntry.countDocuments();
    const completed = await ProgramEntry.countDocuments({ status: 'Completed' });
    const onTrack = await ProgramEntry.countDocuments({ status: 'On Track' });
    const delayed = await ProgramEntry.countDocuments({ status: 'Delayed' });
    const atRisk = await ProgramEntry.countDocuments({ status: 'At Risk' });

    // percentages (safe)
    const percent = (n) => (total === 0 ? 0 : +( (n / total) * 100 ).toFixed(1));

    res.json({
      total,
      counts: { completed, onTrack, delayed, atRisk },
      percentages: {
        completed: percent(completed),
        onTrack: percent(onTrack),
        delayed: percent(delayed),
        atRisk: percent(atRisk)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Seed demo data (ONE TIME USE)
exports.seedDemoData = async (req, res) => {
  try {
    const count = await ProgramEntry.countDocuments();

    // agar data already hai to dobara insert na ho
    if (count > 0) {
      return res.json({ message: 'Demo data already exists' });
    }

    const demoData = [
      {
        university: 'ABC University',
        programs: 'Computer Science',
        currentStatus: 'On Track',
        issues: 'None',
        proposedAction: 'Continue Monitoring',
        responsiblePerson: 'Admin',
        deadline: new Date('2025-12-31'),
        keyUpdates: 'Initial setup completed',
        status: 'On Track',
      },
      {
        university: 'XYZ Institute',
        programs: 'Business Management',
        currentStatus: 'Delayed',
        issues: 'Faculty shortage',
        proposedAction: 'Hire new faculty',
        responsiblePerson: 'HR Team',
        deadline: new Date('2026-01-15'),
        keyUpdates: 'Interview process started',
        status: 'At Risk',
      },
      {
        university: 'National College',
        programs: 'Mechanical Engineering',
        currentStatus: 'Completed',
        issues: '',
        proposedAction: 'Project closed',
        responsiblePerson: 'Project Head',
        deadline: new Date('2025-06-01'),
        keyUpdates: 'All objectives met',
        status: 'Completed',
      },
    ];

    await ProgramEntry.insertMany(demoData);

    res.json({ message: 'Demo data inserted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};