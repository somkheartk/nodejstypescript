import express from 'express';
import { createUser } from '../controllers/userController'

const router = express.Router();

// Create user route
router.post('/register', createUser);

export default router;
 
