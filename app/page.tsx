export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 800, width: "100%" }}>
        <h1 style={{ fontSize: 48, marginBottom: 8 }}>Bar Azulay</h1>
        <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 24 }}>
          Automation & AI Solution Engineer • Next.js • Azure • Python
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://github.com/Bar-azul"
            style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}
          >
            GitHub
          </a>
          <a
            href="/projects"
            style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}
          >
            Projects
          </a>
        </div>
      </div>
    </main>
  );
}
