import express from 'express';
import { createIdea, getUserIdeas, getIdeas } from '../controllers/idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createIdea);
router.get('/:userId', auth, getUserIdeas);
router.get('/', auth, getIdeas);

export default router;
