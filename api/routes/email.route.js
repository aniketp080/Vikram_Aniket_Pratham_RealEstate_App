import express from 'express';
import { sendEmail } from '../controllers/email.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/send-email', verifyToken, sendEmail);

export default router;