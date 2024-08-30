'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const words = "Streamline your ideas, documents, and projects with our unified workspace for seamless collaboration and organization.";
  const router = useRouter();

  return (
    <main className=" h-screen w-screen flex flex-col justify-normal items-center max-lg:overflow-hidden">
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

      {/* Main */}
      <section className=" absolute top-[10vh] left-0 z-0 h-[90vh] w-screen flex flex-row justify-center items-center gap-1 max-lg:flex-col">
        <div className=" w-1/2 h-[90vh] flex flex-col justify-center items-center gap-3 max-lg:w-screen max-lg:mx-2 max-lg:h-[30vh] max-lg:absolute max-lg:top-[10vh] max-lg:left-0">
          <h1 className=" text-4xl font-bold max-lg:text-3xl max-lg:hidden">
            Welcome to <span className=" font-extrabold underline">Chronos</span>.
          </h1>
          <TextGenerateEffect className=" flex justify-center items-center px-4" words={words} />
          <Button
            className=" gap-2"
            onClick={() => { router.push('/sign-up') }}
          >
            Getting Started
            <ArrowRightIcon />
          </Button>
        </div>
        <div className=" w-1/2 h-[90vh] flex justify-center items-center max-lg:w-screen max-lg:mx-2 max-lg:h-[50vh] max-lg:absolute max-lg:top-[40vh] max-lg:left-0 max-lg:overflow-hidden">
          <div className=" w-fit h-fit shadow-lg shadow-gray-300 overflow-hidden px-6 rounded-2xl max-lg:overflow-hidden">
            <Image src={'logo.svg'} height={400} width={500} priority alt={"logo"} />
          </div>
        </div>
      </section>
    </main>
  );
}
