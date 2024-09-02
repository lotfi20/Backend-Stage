import express from 'express';
import { getClients,signupClient, createClient, updateClient, deleteClient ,loginClient} from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.post('/login', loginClient);
router.post('/signup', signupClient);
export default router;
