// routes/announcementRoutes.js
import express from 'express';
import { createAnnouncement, getAnnouncements } from '../controllers/announcementController.js';

const router = express.Router();

// POST /api/announcements
router.post('/', createAnnouncement);

// GET /api/announcements
router.get('/', getAnnouncements);

export default router;
