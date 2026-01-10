"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    setStatus(res.ok ? "success" : "error");
    form.reset();
  }
  
  return (
    <section className="mx-auto max-w-xl px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name" required className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" required className="border p-2 rounded" />
        <textarea name="message" placeholder="Message" required rows={5} className="border p-2 rounded" />

        <button
          disabled={status === "loading"}
          className="bg-black text-white py-2 rounded hover:opacity-80"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && <p className="text-green-600">Message sent ✔️</p>}
        {status === "error" && <p className="text-red-600">Something went wrong ❌</p>}
      </form>
    </section>
  );
}
