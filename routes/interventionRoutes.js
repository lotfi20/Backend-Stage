import express from 'express';
import {
  getInterventions,
  createIntervention,
  updateIntervention,
  deleteIntervention,
  getInterventionsForTechnician
} from '../controllers/interventionController.js';

const router = express.Router();

router.get('/', getInterventions); // Fetch all interventions or for a specific technician
router.post('/', createIntervention); // Create new intervention
router.put('/:id', updateIntervention); // Update an intervention
router.delete('/:id', deleteIntervention); // Delete an intervention
router.get('/technician/:id', getInterventionsForTechnician); // Fetch interventions for a specific technician

export default router;
