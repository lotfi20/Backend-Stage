import Intervention from '../models/Intervention.js';
import Technician from '../models/Technician.js'; 


export const getInterventions = async (req, res) => {
  try {
    const technicianId = req.query.technician;
    let interventions;

    if (technicianId) {
      interventions = await Intervention.find({ technician: technicianId });
    } else {
      interventions = await Intervention.find();
    }

    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createIntervention = async (req, res) => {
  const { client, technician, description, problemType, replacementOption, startDate, endDate, status } = req.body;

  const intervention = new Intervention({
    client,
    technician,
    description,
    problemType,
    replacementOption,
    startDate,
    endDate,
    status
  });

  try {
    const newIntervention = await intervention.save();

    
    await Technician.findByIdAndUpdate(technician, { status: 'Busy' });

    res.status(201).json(newIntervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({ message: `Intervention with ID ${req.params.id} not found` });
    }

    Object.assign(intervention, req.body);
    const updatedIntervention = await intervention.save();
    res.status(200).json(updatedIntervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention not found' });
    }

    await intervention.remove();
    res.status(200).json({ message: 'Intervention deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getInterventionsForTechnician = async (req, res) => {
  try {
    const technicianId = req.params.id;
    const interventions = await Intervention.find({ technician: technicianId });
    res.json(interventions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
