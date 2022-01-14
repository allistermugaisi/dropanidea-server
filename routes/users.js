import express from 'express';

import {
	signup,
	signin,
	forgotPassword,
	// accountActivate,
	// verifyCode,
} from '../controllers/user.js';
import { profile } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/forgot-password', forgotPassword);
// router.post('/account/activate', accountActivate);
// router.post('/verify', verifyCode);

export default router;
