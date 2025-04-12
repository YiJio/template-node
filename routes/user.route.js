// packages
import express from 'express';
// controllers
import { getUser } from '../controllers/user.controller.js';
// middleware
import { protectRoute } from '../middleware/protect-route.js';

const router = express.Router();

router.get('/id/:uid', getUser);

export default router;