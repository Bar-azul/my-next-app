export default function ProjectsPage() {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontSize: 14, letterSpacing: 2, opacity: 0.7, marginBottom: 12 }}>
            PROJECTS
          </p>
  
          <h1 style={{ fontSize: 48, marginBottom: 12 }}>Coming Soon 🚀</h1>
  
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.6, marginBottom: 24 }}>
            אני עובד על עמוד פרויקטים מסודר עם דוגמאות וקישורים.
            בינתיים אפשר לראות את הפרויקטים ב־GitHub.
          </p>
  
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://github.com/Bar-azul"
              style={{
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
  
            <a
              href="/"
              style={{
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Back Home
            </a>
          </div>
        </div>
      </main>
    );
  }
  