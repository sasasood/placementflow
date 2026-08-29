import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to PlacementFlow
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        The centralized platform to track company applications, deadlines,
        tests, and interviews — all in one place.
      </p>
      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-black text-white rounded px-6 py-2"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border rounded px-6 py-2"
        >
          Login
        </Link>
      </div>
    </main>
  );
}