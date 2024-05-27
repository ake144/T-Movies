'use server'

import prisma from '../../lib/db';
import { randomBytes, pbkdf2Sync } from 'crypto';

export async function createUser(username: string, email: string, password: string) {
  try {
    // Generate a salt
    const salt = randomBytes(16).toString('hex');

    // Hash the password with the salt
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Store the salt and the hashed password
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: `${salt}:${hashedPassword}`,
      },
    });

    console.log('User created:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
}
