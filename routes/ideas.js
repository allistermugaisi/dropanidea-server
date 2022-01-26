import express from 'express';
import {
	createIdea,
	getIdea,
	getIdeas,
	getAllIdeas,
	updateIdea,
	deleteIdea,
} from '../controllers/idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createIdea);
router.delete('/:ideaId', auth, deleteIdea);
router.get('/all', auth, getAllIdeas);
router.get('/', auth, getIdeas);
router.get('/:ideaId', auth, getIdea);
router.put('/:ideaId', auth, updateIdea);

export default router;
