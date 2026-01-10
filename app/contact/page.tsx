"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    // honeypot field (bots fill it, humans won't)
    company: "",
  });

  const canSubmit = useMemo(() => {
    const hasRequired =
      form.name.trim() && form.email.trim() && form.message.trim();
    return Boolean(hasRequired) && status !== "loading";
  }, [form, status]);

  // Success message disappears after 3.5 seconds
  useEffect(() => {
    if (status !== "success") return;

    const t = setTimeout(() => {
      setStatus("idle");
    }, 3500);

    return () => clearTimeout(t);
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // quick client-side bot check: if honeypot filled -> just pretend success
    if (form.company.trim()) {
      setStatus("success");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          company: form.company, // honeypot (server checks too)
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong.");
    }
  }

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-semibold mb-8">Contact</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot: hidden from humans, visible to bots */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>

          <input
            className="w-full rounded border border-white/25 bg-transparent px-4 py-3 outline-none focus:border-white/60"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full rounded border border-white/25 bg-transparent px-4 py-3 outline-none focus:border-white/60"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <textarea
            className="w-full min-h-[140px] rounded border border-white/25 bg-transparent px-4 py-3 outline-none focus:border-white/60"
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              "w-full rounded border border-white/25 px-4 py-3",
              "transition",
              status === "loading" || !canSubmit
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-white/60 hover:opacity-90",
            ].join(" ")}
          >
            {status === "loading" ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner />
                Sending…
              </span>
            ) : (
              "Send message"
            )}
          </button>

          {/* Feedback */}
          <div className="min-h-6 pt-1">
            {status === "success" && (
              <p className="text-green-500 inline-flex items-center gap-2">
                Message sent <span aria-hidden="true">✔</span>
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500">{error || "Failed to send."}</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function Spinner() {
  // Tailwind-only spinner (no extra CSS file needed)
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-label="Loading"
      role="status"
    />
  );
}
