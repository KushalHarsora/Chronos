'use client'

/* UI Components import */

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

/* System Components import */

import { useRouter } from "next/navigation"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios'
import React from "react"


const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Username Needed"
    }),
    email: z.string().email().min(5, {
        message: "Email Required"
    }),
    password: z.string().min(8, {
        message: "Password is short"
    }).max(500, {
        message: "Password too long"
    })
});

const SignUp = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            const response: AxiosResponse = await axios.post("/auth/sign-up", { values }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            if (response.status === 201) {
                toast.success(data.message || "Sign-up successful!", {
                    duration: 1500
                });
                router.push("/sign-in");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 409) {
                    toast.error(data.error || "User Already exists", {
                        duration: 2500
                    })
                    router.push("/sign-in");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    duration: 2500
                });
            }
        }
    };

    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex flex-col justify-normal items-center">
                {/* Navbar */}
                <nav className=" fixed z-10 h-[10vh] w-screen flex flex-row justify-between px-[10%] items-center border-b-[1px] bg-white/75 backdrop-blur-lg">
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
                </nav>

                <section className=' absolute top-[10vh] h-[90vh] w-2/6 max-md:w-fit max-lg:w-1/2 flex flex-col justify-center items-center z-10'>
                    <Card className=' h-fit w-full'>
                        <CardHeader>
                            <CardTitle className=' text-center text-xl font-bold'>SIGN UP</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                                    <FormField
                                        control={form.control}
                                        name='username'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input type='text' placeholder='enter username' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type='email' placeholder='enter email' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='enter password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className=' w-full lg:hover:bg-white lg:hover:text-black'>
                                        Register
                                    </Button>
                                    <Separator className=' my-4' />
                                    <div className=' w-full flex flex-row justify-center gap-4'>
                                        <span>
                                            Already have an account?
                                        </span>
                                        <span>
                                            <Link href={'/sign-in'} className=' font-bold text-gray-700 underline decoration-wavy decoration-slate-400'>
                                                Sign in
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </React.Fragment>
    )
}

export default SignUp