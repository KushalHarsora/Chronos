'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password is short"
    }).max(500, {
        message: "Password too long"
    })
});

const SignIn = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const response: AxiosResponse = await axios.post('/auth/user/login', { values }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;

            if (response.status === 200) {
                toast.success(data.message || "Login successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });

                const username = data.name.split(" ");
                var name = "";

                for (let i = 0; i < username.length; i++) {
                    name += username[i];
                }

                router.push(`/dashboard`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 401) {
                    toast.error(data.error || "User does not Exists", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    })
                    router.push("/sign-up");
                } else if (status === 409) {
                    toast.error(data.error || "Invalid Credentials", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.resetField('password');
                } else {
                    toast.error(data.error || "Some Error Occured", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.reset();
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    invert: false,
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
                            <CardTitle className=' text-center text-xl font-bold'>SIGN IN</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
                                        Login
                                    </Button>
                                    <Separator className=' my-4' />
                                    <div className=' w-full flex flex-row justify-center gap-4'>
                                        <span>
                                            Don&apos;t have an account?
                                        </span>
                                        <span>
                                            <Link href={'/sign-up'} className=' font-bold text-gray-700 underline'>
                                                Sign up
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

export default SignIn