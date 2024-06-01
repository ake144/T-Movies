import React from 'react'
import Movies from '@/components/tv/movies/content'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

async function MoviePage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/movies');
  }
  return (
      <>
    <Movies />
     </>
  )
}

export default MoviePage