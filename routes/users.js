import express from 'express';

import {
	signup,
	signin,
	forgotPassword,
	getUsers,
	// accountActivate,
	// verifyCode,
} from '../controllers/user.js';
import { profile } from '../controllers/profile.js';
import { psychometricTest } from '../controllers/psychometricTest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/psychometric-test', auth, psychometricTest);
router.put('/forgot-password', forgotPassword);
router.get('/users', auth, getUsers);
// router.post('/account/activate', accountActivate);
// router.post('/verify', verifyCode);

export default router;
