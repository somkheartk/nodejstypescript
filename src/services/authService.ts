import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '12345678'; // ควรใช้ Environment Variables
const JWT_EXPIRES_IN = '1h';

// กำหนดประเภทสำหรับ Payload ที่จะเก็บใน JWT
interface JwtPayload {
    username: string;
}

/**
 * สร้าง JWT Token
 * @param payload ข้อมูลที่จะเก็บใน Token
 * @returns JWT Token
 */
export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * ตรวจสอบ JWT Token
 * @param token Token ที่ต้องการตรวจสอบ
 * @returns ข้อมูลที่ถูกถอดรหัสจาก Token
 * @throws Error เมื่อ Token ไม่ถูกต้องหรือหมดอายุ
 */
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
