// models/intervention.js

import mongoose from 'mongoose';

const interventionSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician', required: true },
  description: { type: String, required: true },
  problemType: { type: String, required: true },  // New field
  replacementOption: { type: String, required: true },  // New field
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], // Ensure valid values
    default: 'Pending'
  }
});

const Intervention = mongoose.model('Intervention', interventionSchema);

export default Intervention;
