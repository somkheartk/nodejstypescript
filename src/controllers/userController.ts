// controllers/user.controller.ts
import { Request, Response } from 'express';
import { createUserService } from '../services/userservice'
export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const result = await createUserService(username, email, password);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json({ message: result.success });
}
