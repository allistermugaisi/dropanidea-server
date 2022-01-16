import express from 'express';
import { createIdea, getIdea, getIdeas } from '../controllers/idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createIdea);
router.get('/:ideaId', auth, getIdea);
router.get('/', auth, getIdeas);

export default router;
