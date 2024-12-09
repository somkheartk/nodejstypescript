// services/user.service.ts
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

export async function createUserService(username: string, email: string, password: string) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return { success: 'User created successfully' };
  } catch (error) {
    return { error: 'Server error' };
  }
}
