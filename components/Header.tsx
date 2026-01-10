import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="
      sticky top-0 z-50 border-b
      bg-white/80 text-black backdrop-blur
      dark:bg-zinc-950/80 dark:text-white
      border-black/10 dark:border-white/10
    ">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-black dark:text-white"
        >
          Bar Azul
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/#about"
            className="text-black/70 hover:text-black transition dark:text-white/70 dark:hover:text-white"
          >
            About
          </Link>

          <Link
            href="/projects"
            className="text-black/70 hover:text-black transition dark:text-white/70 dark:hover:text-white"
          >
            Projects
          </Link>
          <Link className="text-black/70 hover:text-black transition dark:text-white/70 dark:hover:text-white" href="https://www.linkedin.com/in/bar-azulay-154900244/" target="_blank" rel="noreferrer">
              LinkedIn
          </Link>


          <Link
            href="/contact"
            className="text-black/70 hover:text-black transition dark:text-white/70 dark:hover:text-white"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Bar-azul"
            target="_blank"
            rel="noreferrer"
            className="
              text-sm
              text-black/70 hover:text-black transition
              dark:text-white/70 dark:hover:text-white
            "
          >
            GitHub
          </a>

          <a
            href="/cv.pdf"
            className="
              rounded-md border px-3 py-1 text-sm transition
              border-black/20 text-black hover:border-black/50
              dark:border-white/25 dark:text-white dark:hover:border-white/60
            "
          >
            CV
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
