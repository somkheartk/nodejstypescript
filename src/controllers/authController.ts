import { Request, Response } from 'express';
import { generateToken, verifyToken } from '../services/authService';
import HTTP_STATUS from './../constants/httpStatus';

/**
 * เข้าสู่ระบบ (Login)
 * @param req Request จากผู้ใช้
 * @param res Response ที่ส่งกลับ
 */
export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    // ตรวจสอบ username/password (ตัวอย่างนี้ไม่ตรวจสอบจริง)
    if (username === 'admin' && password === 'password') {
        const token = generateToken({ username });
        res.json({ token });
    } else {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }
};

/**
 * ตรวจสอบ JWT Token
 * @param req Request จากผู้ใช้
 * @param res Response ที่ส่งกลับ
 */
export const checkToken = (req: Request, res: Response): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token is required' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        res.json({ decoded });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
