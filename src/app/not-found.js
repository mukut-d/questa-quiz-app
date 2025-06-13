// src/app/not-found.js
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-[url('/notFound.png')] bg-cover bg-center p-10 rounded-lg shadow-xl w-full max-w-3xl text-center relative ">
        <div className="text-6xl font-bold text-[#5C1E1E] mb-4 flex justify-center items-center gap-4">
          <span>4</span>
          <Image
            src="/ring.png" // <- must be placed in /public
            alt="Ring"
            width={64}
            height={64}
            className="inline-block"
          />
          <span>4</span>
        </div>
        <h1 className="text-2xl md:text-3xl text-[#5C1E1E] font-semibold mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-sm md:text-base text-[#5C1E1E] mb-6">
          Perhaps you can try to refresh the page
        </p>
        <Link href="/">
          <button className="bg-[#5C1E1E] text-white px-6 py-2 rounded-md hover:bg-[#451616] transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
