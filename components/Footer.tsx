export default function Footer() {
    return (
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>Built with Next.js · Deployed on Vercel</p>
  
          <div className="flex gap-4">
            <a className="hover:opacity-70" href="https://github.com/Bar-azul" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bar3882@gmail.com&su=Contact%20from%20portfolio&body=Hi%20Bar%2C%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70"
            >
              Email
            </a>

            <a className="hover:opacity-70" href="https://www.linkedin.com/in/bar-azulay-154900244/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
  
          <p>© {new Date().getFullYear()} Bar Azul</p>
        </div>
      </footer>
    );
  }
  