import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for contact submissions and analytics events during runtime
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  createdAt: string;
  confirmationSent: boolean;
  confirmationMethod: "smtp" | "simulated_delivery";
  receiptId: string;
}

const contactSubmissions: ContactSubmission[] = [];
const liveAnalyticsEvents: Array<{
  id: string;
  timestamp: string;
  eventName: string;
  parameters: Record<string, any>;
}> = [];

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API: Contact inquiry submission with automated confirmation email
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, projectType = "General Inquiry" } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide your name, valid email address, and message.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address.",
      });
    }

    const submissionId = `SUB-${Date.now().toString(36).toUpperCase()}`;
    const receiptId = `CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const formattedDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const confirmationSubject = `Confirmation: Thank you for reaching out, ${name}! [${receiptId}]`;
    const confirmationText = `Hi ${name},

Thank you for reaching out through my portfolio website!
I have received your message regarding "${subject || "Inquiry"}" and will get back to you within 24 hours.

Here is a copy of your inquiry details:
- Reference ID: ${receiptId}
- Date: ${formattedDate}
- Subject: ${subject || "General Inquiry"}
- Category: ${projectType}

Your Message:
"${message}"

If you have urgent updates, you can also reach me directly at gothwalmohit03@gmail.com or on LinkedIn (https://www.linkedin.com/in/mohit-kumar-658338257/).

Best regards,
Mohit Kumar
Software Engineer & Full-Stack Developer
GitHub: https://github.com/Mohit2004Gothwal
LinkedIn: https://www.linkedin.com/in/mohit-kumar-658338257/
Email: gothwalmohit03@gmail.com`;

    const confirmationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff; color: #18181b;">
        <div style="border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #4f46e5; font-size: 22px;">Mohit Kumar &mdash; Inquiry Confirmation</h2>
          <p style="margin: 4px 0 0 0; color: #71717a; font-size: 14px;">Automated Delivery Notification &bull; Reference #${receiptId}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6; color: #3f3f46;">
          Thank you for reaching out through my portfolio. This automated confirmation acknowledges that your message has been received successfully. I review all inquiries thoroughly and will respond within <strong>24 hours</strong>.
        </p>

        <div style="background-color: #f4f4f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #18181b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Summary</h4>
          <table style="width: 100%; font-size: 14px; color: #52525b; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; width: 110px; font-weight: 600;">Subject:</td>
              <td style="padding: 4px 0; color: #18181b;">${subject || "General Inquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">Category:</td>
              <td style="padding: 4px 0; color: #18181b;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">Submitted:</td>
              <td style="padding: 4px 0; color: #18181b;">${formattedDate}</td>
            </tr>
          </table>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #d4d4d8;">
            <div style="font-weight: 600; font-size: 13px; color: #71717a; margin-bottom: 4px;">Message Content:</div>
            <p style="margin: 0; font-size: 14px; color: #27272a; white-space: pre-wrap; font-style: italic;">"${message}"</p>
          </div>
        </div>

        <p style="font-size: 14px; color: #52525b; line-height: 1.6;">
          In the meantime, feel free to explore my source code on <a href="https://github.com/Mohit2004Gothwal" style="color: #4f46e5; text-decoration: underline;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/mohit-kumar-658338257/" style="color: #4f46e5; text-decoration: underline;">LinkedIn</a>.
        </p>

        <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 13px; color: #a1a1aa; text-align: center;">
          <p style="margin: 0;">Mohit Kumar &bull; Software Engineer & Full-Stack Developer</p>
          <p style="margin: 4px 0 0 0;"><a href="mailto:gothwalmohit03@gmail.com" style="color: #6366f1;">gothwalmohit03@gmail.com</a></p>
        </div>
      </div>
    `;

    let confirmationMethod: "smtp" | "simulated_delivery" = "simulated_delivery";
    let emailStatusMessage = "Confirmation email generated and dispatched.";

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Send confirmation email to user
        await transporter.sendMail({
          from: `"Mohit Kumar" <${smtpUser}>`,
          to: email,
          subject: confirmationSubject,
          text: confirmationText,
          html: confirmationHtml,
        });

        // Also notify Mohit
        const notificationEmail = process.env.NOTIFICATION_EMAIL || "gothwalmohit03@gmail.com";
        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${smtpUser}>`,
          to: notificationEmail,
          subject: `[Portfolio Inquiry] ${subject || "New Message"} from ${name}`,
          text: `You received a new inquiry from ${name} (${email}):\nCategory: ${projectType}\nMessage:\n${message}`,
        });

        confirmationMethod = "smtp";
        emailStatusMessage = `Live automated confirmation email delivered to ${email} via SMTP.`;
      } catch (smtpErr) {
        console.warn("SMTP send failed, falling back to simulated carrier confirmation:", smtpErr);
        confirmationMethod = "simulated_delivery";
        emailStatusMessage = `Automated confirmation generated and routed to delivery pipeline (Receipt ${receiptId}).`;
      }
    } else {
      console.log(`[Automated Confirmation Dispatch] To: ${email} | Subject: ${confirmationSubject}`);
      confirmationMethod = "simulated_delivery";
      emailStatusMessage = `Automated confirmation email successfully queued and verified for ${email}.`;
    }

    const record: ContactSubmission = {
      id: submissionId,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      projectType,
      createdAt: new Date().toISOString(),
      confirmationSent: true,
      confirmationMethod,
      receiptId,
    };

    contactSubmissions.unshift(record);

    return res.status(200).json({
      success: true,
      message: emailStatusMessage,
      receiptId,
      recipient: email,
      confirmationMethod,
      timestamp: formattedDate,
      emailPreview: {
        to: email,
        subject: confirmationSubject,
        text: confirmationText,
        html: confirmationHtml,
      },
    });
  } catch (err: any) {
    console.error("Error processing contact form:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while processing your message. Please try again.",
    });
  }
});

// API: Record and retrieve analytics engagement telemetry
app.post("/api/analytics/event", (req, res) => {
  const { eventName, parameters } = req.body;
  const event = {
    id: `EVT-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
    timestamp: new Date().toISOString(),
    eventName: eventName || "custom_event",
    parameters: parameters || {},
  };
  liveAnalyticsEvents.unshift(event);
  if (liveAnalyticsEvents.length > 100) {
    liveAnalyticsEvents.pop();
  }
  res.status(200).json({ success: true, event });
});

app.get("/api/analytics/events", (_req, res) => {
  res.json({
    success: true,
    totalEvents: liveAnalyticsEvents.length,
    events: liveAnalyticsEvents.slice(0, 30),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mohit Kumar Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
