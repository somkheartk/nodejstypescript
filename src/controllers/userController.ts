// controllers/user.controller.ts
import { Request, Response } from 'express';
import { createUserService } from '../services/userservice';
import HTTP_STATUS from '../constants/httpStatus';

interface CreateUserResult {
  success?: string;
  error?: string;
}
export async function addUser(req: Request, res: Response){
  const { username, email, password } = req.body;

  // Ensure you validate input if needed
  if (!username || !email || !password) {
     res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'All fields are required' });
  }

  try {
    // Call your service function
    const result: CreateUserResult = await createUserService(username, email, password);

    // Handle errors or success
    if (result.error) {
       res.status(HTTP_STATUS.BAD_REQUEST).json({ message: result.error });
    }

     res.status(HTTP_STATUS.CREATED).json({ message: result.success || 'User created successfully' });
  } catch (error) {
    // Handle unexpected errors
     res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}
