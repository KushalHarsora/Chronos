'use client'

// System imports
import React from 'react'

// UI Component imports
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <React.Fragment>
      <main className=' h-screen w-screen flex justify-center items-center'>
        <Button
          variant={'link'}
          className=' cursor-pointer'
          onClick={() => { toast.success('Hello World') }}
        >
          Hello World
        </Button>
      </main>
    </React.Fragment>
  )
}

export default Page