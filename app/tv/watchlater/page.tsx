import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

import Sports from '@/components/tv/sports/content'
import WatchLater from '@/components/tv/watchlatter/content'

async function WatchLaterPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/tv/watchlater');
  }
  return (
      <>
      <WatchLater  />
     </>
  )
}

export default WatchLaterPage