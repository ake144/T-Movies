import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

import FavMovies from '@/components/tv/fav/content'

async function WatchLaterPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/fav');
  }
  return (
      <>
      <FavMovies  />
     </>
  )
}

export default WatchLaterPage