import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

import Sports from '@/components/tv/sports/content'

async function MoviePage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/sport');
  }
  return (
      <>
      <Sports  />
     </>
  )
}

export default MoviePage