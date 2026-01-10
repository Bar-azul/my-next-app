import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          Bar Azul
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="hover:opacity-70" href="/#about">About</Link>
          <Link className="hover:opacity-70" href="/projects">Projects</Link>
          <Link className="hover:opacity-70" href="/#contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="text-sm hover:opacity-70"
            href="https://github.com/Bar-azul"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className="rounded-md border px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
            href="/cv.pdf"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
