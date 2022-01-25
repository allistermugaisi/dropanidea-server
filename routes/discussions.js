import express from 'express';
import {
	createDiscussion,
	getAllDiscussions,
	deleteDiscussion,
} from '../controllers/discussion.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createDiscussion);
// router.get('/:userId', auth, getUserDiscussions);
router.get('/all', auth, getAllDiscussions);
router.delete('/:discussionId', auth, deleteDiscussion);

export default router;
