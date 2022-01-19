import express from 'express';
import {
	createDiscussion,
	getDiscussions,
	deleteDiscussion,
} from '../controllers/discussion.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createDiscussion);
// router.get('/:userId', auth, getUserDiscussions);
router.get('/', auth, getDiscussions);
router.delete('/:discussionId', auth, deleteDiscussion);

export default router;
