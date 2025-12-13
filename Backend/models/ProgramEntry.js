// models/ProgramEntry.js
const mongoose = require('mongoose');

const ProgramEntrySchema = new mongoose.Schema({
  university: { type: String, required: true },
  programs: { type: String, required: true }, // text like "Computer Science BSc"
  currentStatus: { type: String }, // short description
  issues: { type: String },
  proposedAction: { type: String },
  responsiblePerson: { type: String },
  deadline: { type: Date },
  keyUpdates: { type: String },
  status: {
    type: String,
    enum: ['On Track','Delayed','At Risk','Completed'],
    default: 'On Track'
  }
}, { timestamps: true });

module.exports = mongoose.model('ProgramEntry', ProgramEntrySchema);
