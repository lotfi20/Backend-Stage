import express from 'express';
import {
  getInterventions,
  createIntervention,
  updateIntervention,
  deleteIntervention,
  getInterventionsForTechnician
} from '../controllers/interventionController.js';

const router = express.Router();

router.get('/', getInterventions); 
router.post('/', createIntervention); 
router.put('/:id', updateIntervention); 
router.delete('/:id', deleteIntervention); 
router.get('/technician/:id', getInterventionsForTechnician); 

export default router;
