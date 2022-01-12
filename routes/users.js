import express from 'express';

import {
	signup,
	signin,
	// accountActivate,
	// verifyCode,
	// forgotPassword,
} from '../controllers/user.js';
import { profile } from '../controllers/profile.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.post('/signin', signin);
router.post('/signup', signup);
// router.post('/account/activate', accountActivate);
// router.post('/verify', verifyCode);
// router.put('/forgot-password', forgotPassword);

export default router;
