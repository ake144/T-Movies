import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import TvShow from '@/components/tv/tvShow/content'

async function MoviePage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/tvShow');
  }
  return (
      <>
    <TvShow  />
     </>
  )
}

export default MoviePage