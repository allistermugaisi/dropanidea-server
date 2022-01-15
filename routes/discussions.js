import express from 'express';
import {
	createDiscussion,
	getUserDiscussions,
	getIdeaDiscussions,
} from '../controllers/discussion.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createDiscussion);
router.get('/:userId', auth, getUserDiscussions);
router.get('/:ideaId', auth, getIdeaDiscussions);

export default router;
