import express from 'express';
import { getClients, createClient, updateClient, deleteClient ,loginClient} from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.post('/login', loginClient);
export default router;
