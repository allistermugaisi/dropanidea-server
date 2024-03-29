import express from 'express';

import {
	signup,
	signin,
	forgotPassword,
	getUser,
	getUsers,
	updateUser,
	// accountActivate,
	// verifyCode,
} from '../controllers/user.js';
import { profile } from '../controllers/profile.js';
import { psychometricTest } from '../controllers/psychometricTest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.get('/users', auth, getUsers);
router.get('/user/:id', auth, getUser);
router.put('/user', auth, updateUser);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/psychometric-test', auth, psychometricTest);
router.put('/forgot-password', forgotPassword);
// router.post('/account/activate', accountActivate);
// router.post('/verify', verifyCode);

export default router;
