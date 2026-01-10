import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const { name, email, message, company } = await req.json();

    // ---- Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ---- Honeypot: if filled, treat as bot (silently succeed)
    if (typeof company === "string" && company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ---- Bot-ish payload guard (simple, effective)
    const msg = String(message);
    if (msg.length > 3000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    // Optional: block obvious spam links (keep it soft to avoid false positives)
    const lower = msg.toLowerCase();
    const urlCount = (lower.match(/https?:\/\//g) || []).length;
    if (urlCount >= 3) {
      return NextResponse.json({ error: "Too many links" }, { status: 400 });
    }

    // ---- Env checks
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replaceAll("\n", "<br/>");

    const subject = `New message from ${String(name)} (Portfolio)`;

    // ---- Email template (HTML)
    const html = `
      <div style="font-family: Arial, sans-serif; background:#0b0b0b; color:#ffffff; padding:24px;">
        <div style="max-width:640px; margin:0 auto; border:1px solid rgba(255,255,255,0.15); border-radius:14px; overflow:hidden;">
          <div style="padding:18px 20px; background:rgba(255,255,255,0.06);">
            <div style="font-size:18px; font-weight:700;">New Contact Message</div>
            <div style="font-size:12px; opacity:0.8; margin-top:4px;">Sent from your portfolio contact form</div>
          </div>

          <div style="padding:20px;">
            <div style="margin-bottom:14px;">
              <div style="font-size:12px; opacity:0.7;">Name</div>
              <div style="font-size:15px; font-weight:600;">${safeName}</div>
            </div>

            <div style="margin-bottom:14px;">
              <div style="font-size:12px; opacity:0.7;">Email</div>
              <div style="font-size:15px; font-weight:600;">
                <a href="mailto:${safeEmail}" style="color:#9bdcff; text-decoration:none;">${safeEmail}</a>
              </div>
            </div>

            <div style="height:1px; background:rgba(255,255,255,0.12); margin:18px 0;"></div>

            <div style="font-size:12px; opacity:0.7; margin-bottom:8px;">Message</div>
            <div style="font-size:14px; line-height:1.6; background:rgba(255,255,255,0.04); padding:14px; border-radius:10px; border:1px solid rgba(255,255,255,0.10);">
              ${safeMessage}
            </div>

            <div style="margin-top:18px; font-size:12px; opacity:0.7;">
              Reply directly to this email to respond.
            </div>
          </div>

          <div style="padding:14px 20px; background:rgba(255,255,255,0.04); font-size:12px; opacity:0.75;">
            © ${new Date().getFullYear()} Bar Azul • Portfolio Contact
          </div>
        </div>
      </div>
    `;

    // ---- Plain text fallback (deliverability improvement)
    const text =
      `New Contact Message\n\n` +
      `Name: ${String(name)}\n` +
      `Email: ${String(email)}\n\n` +
      `Message:\n${String(message)}\n`;

    const result = await resend.emails.send({
      // Keep onboarding@resend.dev if you don't have a custom domain yet
      from: "Bar Azul Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject,
      replyTo: String(email),
      html,
      text,
    });

    // If Resend returns an error-like structure, bubble it
    // (resend typically throws, but we keep a safety check)
    // @ts-ignore
    if (result?.error) {
      // @ts-ignore
      console.error("Resend error:", result.error);
      // @ts-ignore
      return NextResponse.json({ error: result.error.message || "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to send" },
      { status: 500 }
    );
  }
}
