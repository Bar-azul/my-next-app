"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  // ניקוי הודעה אחרי 3 שניות
  useEffect(() => {
    if (status === "success" || status === "error") {
      const t = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot – בוטים ממלאים, בני אדם לא
    if (formData.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot field (hidden) */}
        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <input
          name="name"
          placeholder="Name"
          required
          className="border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />

        <textarea
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="border p-2 rounded"
        />

        <button
          disabled={status === "loading"}
          className={`py-2 rounded transition ${
            status === "loading"
              ? "bg-black/60 cursor-not-allowed text-white"
              : "bg-black text-white hover:opacity-80"
          }`}
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-green-600">Message sent ✔️</p>
        )}
        {status === "error" && (
          <p className="text-red-600">Something went wrong ❌</p>
        )}
      </form>
    </section>
  );
}
