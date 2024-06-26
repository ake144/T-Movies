import React from 'react'
import Movies from '@/components/tv/movies/content'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import LiveTv from '@/components/tv/Live/content'


async function Live() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/live');
  }
  return (
      <>
    <LiveTv  />
     </>
  )
}

export default Live