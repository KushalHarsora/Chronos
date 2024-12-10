'use client'

/* UI Components import */

import { Button } from "../components/ui/button"

/* System Components import */

import { useRouter } from "next/navigation"
import React from "react"
import Image from "next/image"


const NotFound = () => {

    const router = useRouter();

    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex flex-col justify-center items-center gap-4">
                <Image 
                    src={'/page-not-found.svg'}
                    width={600}
                    height={600}
                    alt={'not-found'}
                    priority
                />
                <Button 
                    variant={'link'} 
                    className=" text-base font-medium underline decoration-wavy decoration-red-500" 
                    onClick={() => router.push('/')}
                >
                    Go Back
                </Button>
            </main>
        </React.Fragment>
    )
}

export default NotFound
