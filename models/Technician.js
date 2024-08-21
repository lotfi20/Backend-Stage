import mongoose from 'mongoose';

const technicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: String, required: true },
  status: { type: String, required: true, enum: ['Available', 'Busy', 'Offline'], default: 'Available' }
});

const Technician = mongoose.model('Technician', technicianSchema);

export default Technician;
