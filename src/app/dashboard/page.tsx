'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRightIcon, GearIcon, HamburgerMenuIcon, MagnifyingGlassIcon, HomeIcon, TokensIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import React from "react"

const Dashboard = () => {

    const router = useRouter()

    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex justify-center items-center">
                {/* Navbar */}
                <section className=" fixed z-0 h-[10vh] w-screen flex flex-row justify-between px-[10%] items-center border-b-[1.5px] bg-white/75 backdrop-blur-lg">
                    <div>
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
                                    <div className=" mt-[5vh] h-2/6 w-full flex flex-col justify-evenly items-center">
                                    <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick = {() => {}} 
                                        >
                                            <MagnifyingGlassIcon />
                                            Search
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick = {() => {router.push('/dashboard')}} 
                                        >
                                            <HomeIcon />
                                            Dashboard
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick = {() => {router.push('/setting')}} 
                                        >
                                            <GearIcon />
                                            Settings
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick = {() => {router.push('/')}} 
                                        >
                                            <TokensIcon />
                                            New Page
                                        </Button>
                                    </div>
                                    <Button
                                        variant={'destructive'}
                                        className=" bg-red-600 w-1/2 hover:bg-red-600"
                                        onClick = {() => {}} 
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Dashboard