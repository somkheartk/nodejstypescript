// routes/user.route.ts
import { Router } from 'express';
import { addUser } from '../controllers/userController'

const router = Router();

router.post('/create', addUser);

export default router;
