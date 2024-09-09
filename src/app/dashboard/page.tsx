'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FramerLogoIcon, GearIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

const Dashboard = () => {

    const router = useRouter()

    // Handle Sign-out
    const handlelogout = async () => {
        try {
            await axios.get("/auth/sign-out")
                .then((res) => {
                    toast.success(res.data.message || "Sign out Successful!", {
                        style: {
                            "backgroundColor": "#D5F5E3",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 1500
                    });
                    router.push("/sign-in");
                })
                .catch((error: any) => {
                    console.log(error);
                })
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex justify-center items-center">
                {/* Left Section */}
                <section className=" h-screen w-1/4 absolute left-0 top-0 bg-slate-50 flex flex-col justify-center items-center">
                    <div className=" h-[10vh] w-full absolute top-0 left-0 flex justify-center items-center">
                        <Button variant={'ghost'} onClick={() => { router.push('/') }} className=" font-mono font-semibold text-2xl hover:bg-transparent">
                            Chronos.
                        </Button>
                    </div>
                    <div className=" h-[90vh] w-full absolute top-[10vh] left-0 px-4 flex flex-col justify-between items-center">
                        <div className=" h-fit w-full flex flex-col justify-start items-start gap-2 px-4 mt-4">
                        <Button variant={'link'} onClick={() => {}} className=" font-mono font-medium text-base hover:bg-transparent underline gap-2">
                            <FramerLogoIcon />
                            New Page
                        </Button>
                        <Button variant={'link'} onClick={() => {}} className=" font-mono font-medium text-base hover:bg-transparent underline gap-2">
                            <GearIcon />
                            Setting
                        </Button>
                        </div>
                        <div className=" h-fit w-full flex justify-center items-center mb-10">
                            <Button
                                variant={'destructive'}
                                className=" text-base w-2/5"
                                onClick={handlelogout}
                            >
                                Sign out
                            </Button>
                        </div>
                    </div>
                </section>
                <section className=" h-screen w-3/4 absolute left-1/4 top-0 bg-white">

                </section>
            </main>
        </React.Fragment>
    )
}

export default Dashboard