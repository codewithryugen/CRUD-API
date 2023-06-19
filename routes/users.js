import express from 'express';
import { updateUser,getUsers,createUser, deleteUser, loginUser} from '../controllers/userController.js';
import userMiddleware from '../middleware/userMiddleware.js';
const router = express.Router();

router.get('/users',getUsers);
router.post('/user/register',userMiddleware,createUser);
router.delete('/user/:id',userMiddleware,deleteUser);
router.put('/user/:id',userMiddleware,updateUser);
router.post('/user/login',loginUser);

export default router;