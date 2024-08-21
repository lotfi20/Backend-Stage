import express from 'express';
import { getTechnicians, createTechnician, updateTechnician, deleteTechnician ,loginTechnician,getTechnicianByEmailOrPhone} from '../controllers/technicianController.js';

const router = express.Router();
router.get('/find', getTechnicianByEmailOrPhone);
router.get('/', getTechnicians);
router.post('/', createTechnician);
router.put('/:id', updateTechnician);
router.delete('/:id', deleteTechnician);
router.post('/login', loginTechnician);
export default router;
