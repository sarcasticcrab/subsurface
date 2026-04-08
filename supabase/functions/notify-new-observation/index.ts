import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response("No record", { status: 400 });
    }

    const tags = Array.isArray(record.tags)
      ? record.tags.join(", ")
      : JSON.parse(record.tags || "[]").join(", ");

    const emailBody = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #2C3328; color: #DCFFC7;">
        <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">New Subsurface Observation</h1>
        <p style="opacity: 0.6; font-size: 0.85rem; margin-bottom: 2rem;">A new observation has been submitted and is awaiting your approval.</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1); opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Date</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1);">${record.date}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1); opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Location</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1);">${record.lat?.toFixed(4)}°N, ${Math.abs(record.lng)?.toFixed(4)}°W</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1); opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Tags</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid rgba(220,255,199,0.1);">${tags || "None"}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Notes</td>
            <td style="padding: 0.75rem 0;">${record.notes || "None"}</td>
          </tr>
        </table>

        <a href="http://localhost:3000/admin" 
           style="display: inline-block; margin-top: 2rem; padding: 0.75rem 1.5rem; background: #99C555; color: #2C3328; text-decoration: none; font-family: sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px;">
          Review in Admin Panel
        </a>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Subsurface <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New observation submitted — ${tags || "no tags"}`,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(`Email failed: ${err}`, { status: 500 });
    }

    return new Response("Email sent", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
});
