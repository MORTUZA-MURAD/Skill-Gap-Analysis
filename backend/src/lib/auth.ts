import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { userId: string; email: string; role: string }): string {
  return jwt.sign(payload, process.env.SESSION_SECRET!, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SESSION_SECRET!) as {
    userId: string;
    email: string;
    role: string;
  };
}
