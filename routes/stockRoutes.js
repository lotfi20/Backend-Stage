// routes/stockRoutes.js

import express from 'express';
import { getStocks, createStock, updateStock, deleteStock } from '../controllers/stockController.js';

const router = express.Router();

router.get('/', getStocks);
router.post('/', createStock);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

export default router;
