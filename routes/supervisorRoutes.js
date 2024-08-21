// routes/supervisorRoutes.js
import express from 'express';
import { createSupervisor, loginSupervisor } from '../controllers/supervisorController.js';

const router = express.Router();

router.post('/login', loginSupervisor);
router.post('/', createSupervisor);

export default router;
