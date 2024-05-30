// pages/profile.js
import { LogOut } from '@/components/auth/logout-form';
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Handle the case where user is undefined
  if (!user) {
    return (
      <div>
        <p>User not found. Please log in.</p>
      </div>
    );
  }

  return (
    <div>
      <LogOut user={user} />
    </div>
  );
};

export default ProfilePage;
