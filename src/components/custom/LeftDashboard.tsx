'use client'

import axios, { AxiosResponse } from 'axios'
/* UI Components import */

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ArchiveIcon, GearIcon, MagnifyingGlassIcon, PlusCircledIcon, PlusIcon, TokensIcon } from '@radix-ui/react-icons'

/* System Components import */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


const LeftDashboard = () => {

    const router = useRouter();

    const [page, setPage] = useState<{ [key: string]: { name: string, body: {} } }>({});
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const getName = async () => {
            const response: AxiosResponse = await axios.get("/auth/user");
            if (response.data.message) {
                router.push("/sign-in");
            }
            setName(response.data.username);
        }

        getName();
    }, [name, router]);

    const addPage = () => {
        const newPageId = `page${count}`;

        setPage((prev: any) => ({
            ...prev,
            [newPageId]: {
                name: `New Page ${count}`,
                body: {}
            }
        }));

        setCount(prevCount => prevCount + 1);
    }

    const handleLogout = async () => {
        const response: AxiosResponse = await axios.get("auth/sign-out");
        if (response.status === 200) {
            toast.success(response.data.message, {
                style: {
                    "backgroundColor": "#D5F5E3",
                    "color": "black",
                    "border": "none"
                },
                duration: 1500
            });
            router.push("/sign-in");
        } else {
            toast.error(response.data.message, {
                style: {
                    "backgroundColor": "#FADBD8",
                    "color": "black",
                    "border": "none"
                },
                duration: 2500
            })
        }
    }

    return (
        <section className=' relative top-0 left-0 w-1/6 h-screen flex flex-col justify-normal items-center'>
            {/* avatar section */}
            <div className=' h-[10vh] w-full flex justify-center items-center'>
                <Button
                    variant={'default'}
                    className=' p-2 h-fit w-4/5 flex flex-row justify-center items-center relative top-0 left-0 gap-2 bg-transparent hover:bg-transparent text-black shadow-none'
                    onClick={() => { }}
                >
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <span className=' text-xl font-bold underline decoration-wavy decoration-slate-400'>
                        {(name.length) > 8 ? name.substring(0, 8) + "..." : name}
                    </span>
                </Button>
            </div>
            {/* navigation section */}
            <div className=' h-[80vh] w-full relative top-0 left-0 flex flex-col justify-normal items-center gap-4'>
                <div className=' my-2 h-[25vh] w-full flex flex-col justify-normal items-center gap-4'>
                    <Button
                        variant={'default'}
                        className=' h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-2 bg-transparent text-black hover:bg-transparent border-2 border-gray-50 rounded-md shadow-md'
                    >
                        <MagnifyingGlassIcon className=' scale-[1.75]' />
                        <span className=' flex flex-row justify-between items-center w-full text-sm'>
                            <span>Search</span>
                            <span className=' flex flex-row justify-center items-center'>
                                <TokensIcon /> + k
                            </span>
                        </span>
                    </Button>
                    <Button
                        variant={'default'}
                        className=' h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-2 bg-transparent text-black hover:bg-transparent border-2 border-gray-50 rounded-md shadow-md'
                    >
                        <GearIcon className=' scale-[1.75]' />
                        <span className=' flex flex-row justify-start items-center w-full text-sm'>
                            <span>Setting</span>
                        </span>
                    </Button>
                    <Button
                        variant={'default'}
                        className=' h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-2 bg-transparent text-black hover:bg-transparent border-2 border-gray-50 rounded-md shadow-md'
                        onClick={addPage}
                    >
                        <PlusCircledIcon className=' scale-[1.75]' />
                        <span className=' flex flex-row justify-start items-center w-full text-sm'>
                            <span>New Page</span>
                        </span>
                    </Button>
                </div>

                <div className=' h-[40vh] w-full flex flex-col justify-start items-center gap-4'>
                    <div className=' h-fit max-h-[30vh] w-full py-2 overflow-y-auto flex flex-col justify-normal items-center gap-2'>
                        {Object.keys(page).map((key) => (
                            <button
                                key={key}
                                className=" h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-1 bg-transparent text-black hover:bg-transparent rounded-md shadow-md shadow-blue-200 underline"
                            >
                                {page[key].name}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant={'default'}
                        className=' h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-2 bg-transparent text-black hover:bg-transparent border-2 border-gray-50 rounded-md shadow-md'
                    >
                        <PlusIcon className=' scale-[1.75]' />
                        <span className=' flex flex-row justify-start items-center w-full text-sm'>
                            <span>Add a page</span>
                        </span>
                    </Button>
                    <Button
                        variant={'default'}
                        className=' h-fit w-5/6 flex flex-row justify-normal items-center gap-4 px-3 py-2 bg-transparent text-black hover:bg-transparent border-2 border-gray-50 rounded-md shadow-md'
                    >
                        <ArchiveIcon className=' scale-[1.75]' />
                        <span className=' flex flex-row justify-start items-center w-full text-sm'>
                            <span>Trash</span>
                        </span>
                    </Button>
                </div>
            </div>
            {/* sign out button */}
            <div className=' h-[10vh] w-full relative top-0 left-0 flex justify-center items-center'>
                <Button
                    variant={'destructive'}
                    className=' w-3/4 font-bold'
                    onClick={handleLogout}
                >
                    Sign out
                </Button>
            </div>
        </section>
    )
}

export default LeftDashboard
