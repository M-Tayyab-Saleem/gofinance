import express from 'express';
import userAuth from '../middleware/UserAuth.js';
import { getAllUserData, getUserData, editUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/data', userAuth, getUserData);
router.get('/all-data', getAllUserData)
router.put('/edit/:id', editUser)

export default router;
