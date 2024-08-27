'use client'
import Image from "next/image";

export default function Home() {
  return (
    <main className=" h-screen w-screen flex flex-col justify-normal items-center">
      {/* Navbar */}
      <section className=" h-[10vh] w-screen flex flex-row justify-center items-center">
      </section>

      {/* Main */}
      <section className=" h-[90vh] w-screen flex flex-row justify-center items-center">
        <div className=" flex flex-col justify-center items-center gap-3 bg-slate-100">
          <h1 className=" text-5xl font-bold">
            Your Ideas, Documents and Plans.
          </h1>
          <h1 className=" text-5xl font-bold underline">
            Unified.
          </h1>
          <h1 className=" text-5xl font-bold">
            Welcome to <span className=" font-extrabold">Chronos</span>
          </h1>
        </div>
        <div className=" w-2/5 h-fit flex justify-center items-center">
          <div className=" w-fit h-fit shadow-lg shadow-slate-300 overflow-hidden">
          <Image src={'logo.svg'} height={400} width={500} priority alt={"logo"} />
          </div>
        </div>
      </section>
    </main>
  );
}
