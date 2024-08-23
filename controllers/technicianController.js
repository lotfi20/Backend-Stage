import jwt from 'jsonwebtoken';
import Technician from '../models/Technician.js';


export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.technician = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTechnicianByEmailOrPhone = async (req, res) => {
  const { email, phone } = req.query; 

  try {
    const technician = await Technician.findOne({ 
      $or: [{ email: email }, { phone: phone }]
    });

    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    res.status(200).json(technician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createTechnician = async (req, res) => {
  const technician = new Technician(req.body);
  try {
    const newTechnician = await technician.save();
    res.status(201).json(newTechnician);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    Object.assign(technician, req.body);
    const updatedTechnician = await technician.save();
    res.status(200).json(updatedTechnician);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    await technician.remove();
    res.status(200).json({ message: 'Technician deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginTechnician = async (req, res) => {
    const { email, phone } = req.body;
  
    try {
      const technician = await Technician.findOne({ email, phone});
  
      if (!technician) {
        return res.status(404).json({ message: 'Technician not found' });
      }
  
      // Generate a token or perform other login logic
      res.status(200).json({
        message: 'Login successful',
        technician,
        token: 'some-generated-token', // Replace with actual token generation logic
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };