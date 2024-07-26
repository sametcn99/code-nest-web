import React from 'react'
import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="mt-5 flex h-full w-full flex-col place-items-center justify-center">
      <div>
        <Spinner color="default" size={'lg'} />
      </div>
    </div>
  )
}
