import express from 'express';
import {
	createIdea,
	getIdea,
	getIdeas,
	deleteIdea,
} from '../controllers/idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createIdea);
router.get('/:ideaId', auth, getIdea);
router.delete('/:ideaId', auth, deleteIdea);
router.get('/', auth, getIdeas);

export default router;
