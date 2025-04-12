// packages
import express from 'express';
// controllers
import { signup, signin, signout, getMe } from '../controllers/auth.controller.js';
// middleware
import { protectRoute } from '../middleware/protect-route.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

export default router;