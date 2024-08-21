// controllers/supervisorController.js
import Supervisor from '../models/Supervisor.js';

export const createSupervisor = async (req, res) => {
  const supervisor = new Supervisor(req.body);
  try {
    const newSupervisor = await supervisor.save();
    res.status(201).json(newSupervisor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginSupervisor = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const supervisor = await Supervisor.findOne({ email, phone });

    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Generate a token or perform other login logic
    res.status(200).json({
      message: 'Login successful',
      supervisor,
      token: 'some-generated-token', // Replace with actual token generation logic
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
