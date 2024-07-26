import Loading from '@/app/Loading'
import { createClient } from '@/utils/server'
import { Tables } from '../../../types/supabase'
import { InfiniteMovingCards } from './InfiniteMovingCards'

export default async function RandomContents() {
  const supabase = createClient()
  let contents: Tables<'files'>[] = []
  const { data, error } = await supabase.from('files').select('*').limit(10) // Removed the order by random()

  if (error) {
    console.log(error)
    return
  }
  contents = data as Tables<'files'>[]
  const userMap: Record<string, Tables<'profiles'>> = {}

  // Fetch user data for each content
  for (const content of contents) {
    if (!userMap[content.user_id]) {
      const { data: userRes, error: userError } = await supabase
        .from('profiles')
        .select('avatar_url, id, username, full_name')
        .eq('id', content.user_id)
        .single()
      if (!userError) {
        userMap[content.user_id] = userRes as Tables<'profiles'>
      }
    }
  }

  // Assuming you have a utility function to shuffle the array items
  const shuffledData = shuffleArray(data as Tables<'files'>[])

  return (
    <>
      {shuffledData ? (
        <InfiniteMovingCards
          items={shuffledData}
          speed={80}
          users={userMap}
          title="Şunlara da göz atabilirsiniz."
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

// Example shuffle function (implement or import your own)
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
