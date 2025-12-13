// models/FacultyStats.js
const mongoose = require('mongoose');

const FacultyStatsSchema = new mongoose.Schema({
  totalFaculty: { type: Number, default: 0 },
  activeCourses: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  certifications: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('FacultyStats', FacultyStatsSchema);
