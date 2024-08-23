// models/Supervisor.js
import mongoose from 'mongoose';

const SupervisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
});

const Supervisor = mongoose.model('Supervisor', SupervisorSchema);
export default Supervisor;
