import express from 'express';
import userAuth from '../middleware/UserAuth.js';
import { getAllUserData, getUserData, editUser, getAnyUserData, deleteUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/data', userAuth, getUserData);
router.get('/data/:id', getAnyUserData);
router.get('/all-data', getAllUserData)
router.put('/edit/:id', editUser)
router.put('/delete/:id', deleteUser)

export default router;
