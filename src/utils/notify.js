import nodemailer from "nodemailer";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export async function sendEmail({ name, email, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) throw new Error("SMTP not configured");

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: MAIL_TO || SMTP_USER,
    replyTo: `"${name.replace(/["\r\n]/g, "")}" <${email.replace(/[\r\n]/g, "")}>`,
    subject: `New portfolio message from ${name.replace(/[\r\n]/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <p><b>Name:</b> ${esc(name)}</p>
      <p><b>Email:</b> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p style="white-space:pre-wrap;background:#f4f5f8;padding:14px;border-radius:8px">${esc(message)}</p>
    </div>`,
  });
}

export async function sendWhatsApp({ name, email, message }) {
  const provider = (process.env.WHATSAPP_PROVIDER || "callmebot").toLowerCase();
  const phone = (process.env.WHATSAPP_PHONE || "").replace(/\D/g, "");
  if (!phone) throw new Error("WHATSAPP_PHONE not configured");

  const text = `📩 New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}`.slice(0, 1500);

  if (provider === "twilio") {
    const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: token, TWILIO_WHATSAPP_FROM: from } = process.env;
    if (!sid || !token) throw new Error("Twilio not configured");
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from || "whatsapp:+14155238886", To: `whatsapp:+${phone}`, Body: text }),
    });
    if (!res.ok) throw new Error(`Twilio error ${res.status}`);
    return;
  }

  // CallMeBot (free)
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) throw new Error("CALLMEBOT_APIKEY not configured");
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CallMeBot error ${res.status}`);
}
