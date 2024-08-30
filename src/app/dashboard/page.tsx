'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GearIcon, HamburgerMenuIcon, MagnifyingGlassIcon, HomeIcon, TokensIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import React from "react"

const Dashboard = () => {

    const router = useRouter()

    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex justify-center items-center">
                {/* Navbar */}
                <section className=" fixed z-0 h-[10vh] w-screen top-0 left-0 flex flex-row justify-between px-[10%] items-center border-b-[1.5px] bg-white/75 backdrop-blur-lg">
                    <div>
                        <Button variant={'ghost'} onClick={() => { router.push('/') }} className=" font-mono font-semibold text-xl hover:bg-transparent">
                            Chronos.
                        </Button>
                    </div>
                    <div className=" flex flex-row max-lg:hidden">
                        <Button
                            variant={'link'}
                            className=" w-full gap-2 underline"
                            onClick={() => { router.push('/dashboard') }}
                        >
                            <HomeIcon />
                            Dashboard
                        </Button>
                        <Button
                            variant={'destructive'}
                            className=" bg-red-600 w-1/2 hover:bg-red-600"
                            onClick={() => { }}
                        >
                            Sign Out
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
                                            onClick={() => { }}
                                        >
                                            <MagnifyingGlassIcon />
                                            Search
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick={() => { router.push('/dashboard') }}
                                        >
                                            <HomeIcon />
                                            Dashboard
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick={() => { router.push('/setting') }}
                                        >
                                            <GearIcon />
                                            Settings
                                        </Button>
                                        <Button
                                            variant={'link'}
                                            className=" w-full gap-2 underline"
                                            onClick={() => { router.push('/') }}
                                        >
                                            <TokensIcon />
                                            New Page
                                        </Button>
                                    </div>
                                    <Button
                                        variant={'destructive'}
                                        className=" bg-red-600 w-1/2 hover:bg-red-600"
                                        onClick={() => { }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </section>
                <section className=" absolute top-[10vh] left-0 h-[90vh] w-full flex justify-center items-center">
                    <div className=" absolute left-0 top-0 w-1/4 h-[90vh] bg-green-100">

                    </div>
                    <div>

                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}

export default Dashboard