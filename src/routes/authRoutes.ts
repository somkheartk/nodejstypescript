import express from 'express';
import { login, checkToken } from '../controllers/authController'

const router = express.Router();

router.post('/login', login); // เส้นทางสำหรับเข้าสู่ระบบ
router.get('/check-token', checkToken); // เส้นทางสำหรับตรวจสอบ Token

export default router;
