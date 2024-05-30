'use server'

import prisma from '../../lib/db';
import bcrypt from 'bcryptjs';

export async function createUser(username: string, email: string, password: string) {
  try {
     
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
}
