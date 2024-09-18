'use client'

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { FramerLogoIcon, GearIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons"
import axios, { AxiosResponse } from "axios"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const profileSchema = z.object({
    username: z.string()
});

const Dashboard = ({ params }: { params: { id: string } }) => {

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: ""
        }
    });

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [page, setPage] = useState<boolean>(false);

    useEffect(() => {

        const test = async () => {
            const response = axios.get("/auth/user")
            const data = (await response).data;
            setName(data.username);
            setEmail(data.email);
        }

        test()
    }, [])

    const router = useRouter()

    // handle form submit
    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        try {
            const body = {values, email: email}
            const response: AxiosResponse = await axios.post('/auth/user', body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
        
            if (response.status === 200) {
                toast.success(data.message || "Update successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });
                setName(data.username);
                form.reset();
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
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
        }
    }

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'ghost'} className=" text-base font-semibold underline decoration-wavy decoration-red-600 gap-3 hover:bg-transparent">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="icon" />
                                    </Avatar>
                                    {name !== undefined && name?.length > 16 ? name?.substring(0, 16) + "..." : name}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-2">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                                            <FormField
                                                control={form.control}
                                                name='username'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder={name} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="submit" variant={'default'}>Save changes</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className=" h-[90vh] w-full absolute top-[10vh] left-0 px-4 flex flex-col justify-between items-center">
                        <div className=" h-fit w-full flex flex-col justify-start items-start px-6 gap-2 mt-4">
                            <Button variant={'link'} onClick={() => setPage(true)} className=" font-mono font-medium text-base hover:bg-transparent underline gap-2">
                                <FramerLogoIcon />
                                New Page
                            </Button>
                            <Button variant={'link'} onClick={() => { }} className=" font-mono font-medium text-base hover:bg-transparent underline gap-2">
                                <GearIcon />
                                Setting
                            </Button>
                            <Button variant={'link'} onClick={() => { }} className=" font-mono font-medium text-base hover:bg-transparent underline gap-2">
                                <TrashIcon />
                                Trash
                            </Button>
                        </div>
                        <div className=" h-fit w-full flex justify-center items-center mb-10">
                            <Button
                                variant={'destructive'}
                                className=" text-base w-3/5"
                                onClick={handlelogout}
                            >
                                Sign out
                            </Button>
                        </div>
                    </div>
                </section>
                <section className=" h-screen w-3/4 absolute left-1/4 top-0 bg-white">
                    {page ?
                        <div className=" h-full w-full">
                            Page Init
                        </div>
                        :
                        <div className=" h-full w-full flex flex-col justify-center items-center">
                            <Image src={'../page.svg'} height={400} width={500} priority alt={"page"} />
                            <Button className=" gap-2 text-base py-4" variant={'default'} onClick={() => { setPage(!page) }}>
                                <PlusCircledIcon />
                                New Page
                            </Button>
                        </div>
                    }
                </section>
            </main>
        </React.Fragment>
    )
}

export default Dashboard