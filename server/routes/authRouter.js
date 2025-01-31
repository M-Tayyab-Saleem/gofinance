import express from 'express';
import { register, login, logout, sendVerifyOTP, verifyEmail , isAuthenticated, sendResetOTP, resetPassword } from '../controllers/authController.js'; 
import userAuth from '../middleware/UserAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', userAuth, sendVerifyOTP);
router.post('/verify-account', userAuth, verifyEmail);
router.get('/is-auth' , userAuth , isAuthenticated);
router.post('/send-reset-otp', sendResetOTP);
router.post('/reset-password', resetPassword);

export default router;