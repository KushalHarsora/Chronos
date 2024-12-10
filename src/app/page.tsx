'use client'

/* Custom Components import */
import Navbar from "@/components/custom/Navbar"

/* UI Components import */
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ArrowRightIcon } from "@radix-ui/react-icons"

/* System Components import */
import Image from "next/image"
import { useRouter } from "next/navigation"


const Home = () => {

  const words = "Streamline your ideas, documents, and projects with our unified workspace for seamless collaboration and organization.";
  const router = useRouter();

  return (
    <main className=" h-screen w-screen flex flex-col justify-normal items-center max-lg:overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <section className=" absolute top-[10vh] left-0 z-0 h-[90vh] w-screen flex flex-row justify-center items-center gap-1 max-lg:flex-col">
        <div className=" w-1/2 h-[90vh] flex flex-col justify-center items-center gap-3 max-lg:w-screen max-lg:mx-2 max-lg:h-[30vh] max-lg:absolute max-lg:top-[10vh] max-lg:left-0">
          <h1 className=" text-4xl font-bold max-lg:text-2xl">
            Welcome to <span className=" font-extrabold underline decoration-wavy decoration-slate-500">Chronos</span>.
          </h1>
          <TextGenerateEffect className=" flex justify-center items-center px-20 max-lg:text-sm max-lg:px-10" words={words} />
          <Button
            className=" gap-2"
            onClick={() => { router.push('/sign-up') }}
          >
            Getting Started
            <ArrowRightIcon />
          </Button>
        </div>
        <div className=" w-1/2 h-[90vh] flex justify-center items-center max-lg:w-screen max-lg:mx-2 max-lg:h-[50vh] max-lg:absolute max-lg:top-[40vh] max-lg:left-0 max-lg:overflow-hidden">
          <div className=" w-fit h-fit overflow-hidden px-6 rounded-2xl max-lg:overflow-hidden max-lg:mt-6">
            <Image
              src={'logo.svg'}
              height={400}
              width={500}
              priority
              alt={"logo"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home
