import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center glass p-12 rounded-3xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          NexCy
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-xl leading-relaxed">
          The blank canvas for your next great web application. Rebuilt from absolute zero.
        </p>
        <div className="flex gap-4 items-center mt-8">
          <a
            className="rounded-full border border-transparent transition-all flex items-center justify-center bg-white text-black hover:bg-gray-200 text-lg sm:text-xl h-14 px-8"
            href="#"
          >
            Get Started
          </a>
        </div>
      </main>
    </div>
  );
}
