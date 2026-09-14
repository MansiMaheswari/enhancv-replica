import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
        AI Resume Builder (Enhancv Replica)
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Build ATS-friendly professional resumes using modern templates.
      </p>
      <Link
        href="/templates"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </main>
  );
}