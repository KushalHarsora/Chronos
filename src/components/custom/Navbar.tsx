'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'

const Navbar = () => {

    const router = useRouter();

    return (
        <section className=" fixed z-0 h-[10vh] w-screen flex flex-row justify-between px-[10%] items-center border-b-[1.5px] bg-white/75 backdrop-blur-lg">
            <div className=" h-full flex justify-center items-center">
                <Button variant={'ghost'} onClick={() => { router.push('/') }} className=" font-mono font-semibold text-xl hover:bg-transparent">
                    Chronos.
                </Button>
            </div>
            <div className=" flex flex-row max-lg:hidden">
                <Button
                    className=" mx-3"
                    variant={'secondary'}
                    onClick={() => { router.push('/sign-in') }}
                >Sign In</Button>
                <Button
                    className=" mx-3 gap-2"
                    onClick={() => { router.push('/sign-up') }}
                >
                    Getting Started
                    <ArrowRightIcon />
                </Button>
            </div>
            <div className=" lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={'ghost'} className=" hover:bg-transparent">
                            <HamburgerMenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <div className=" w-full h-full flex flex-col justify-between items-center overflow-hidden">
                            <div className=" mt-[5vh] h-[20vh] w-full flex flex-col justify-evenly items-center">
                                <Button
                                    className=" mx-3 w-full"
                                    variant={'secondary'}
                                    onClick={() => { router.push('/sign-in') }}
                                >Sign In</Button>
                                <Button
                                    className=" mx-3 gap-2 w-full"
                                    onClick={() => { router.push('/sign-up') }}
                                >
                                    Getting Started
                                    <ArrowRightIcon />
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </section>
    )
}

export default Navbar
