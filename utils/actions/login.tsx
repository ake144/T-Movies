'use server';

import prisma from '../../lib/db';
import { pbkdf2Sync } from 'crypto';

const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Split the stored password to get the salt and the original hash
    const [salt, storedHash] = user.password.split(':');

    // Hash the provided password with the same salt
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Compare the hashed password with the stored hash
    if (hash !== storedHash) {
      throw new Error('Invalid password');
    }

    console.log('User logged in:', user);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default loginUser;
