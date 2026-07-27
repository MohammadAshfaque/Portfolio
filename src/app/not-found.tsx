import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center justify-center p-6 text-center font-sans">
      <h1 className="text-4xl font-bold font-mono text-amber-400 mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-4 text-zinc-200">Page Not Found</h2>
      <p className="text-sm text-zinc-400 max-w-sm mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white hover:border-zinc-500 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
