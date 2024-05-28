// app/pages/profile.tsx

import { LogOut } from '@/components/auth/logout-form'
import React from 'react'
import { auth } from '@/auth'
import { getSession } from "next-auth/react";


interface User {
    email: string;
    role: string | null;
    username: string;
    password: string;
  }

async function ProfilePage() {
      
    const session = await auth();

  console.log(session)
    if (session){
      const user = session.user as User;
        return (
            <div >
            <LogOut user={user} />
            </div>
        )
    }
    else {
        return (
            <div>
                <p>Not logged in</p>
                <a href="/login">Login</a>
            </div>
        )
    }

}

export default ProfilePage
