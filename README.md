# Mohit Kumar — Professional Portfolio Website

A modern, high-performance personal portfolio website built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Express**, featuring real-time **Google Analytics 4** visitor telemetry, an **automated confirmation email** pipeline, an interactive **skills matrix**, project case studies, and full **dark mode** accessibility.

[![GitHub Profile](https://img.shields.io/badge/GitHub-Mohit2004Gothwal-181717?style=flat&logo=github)](https://github.com/Mohit2004Gothwal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mohit_Kumar-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/mohit-kumar-658338257/)
[![Email](https://img.shields.io/badge/Email-gothwalmohit03%40gmail.com-EA4335?style=flat&logo=gmail)](mailto:gothwalmohit03@gmail.com)

---

## 🌟 Key Features

- **Modern & Responsive UI**: Clean aesthetic with fluid typography (`Plus Jakarta Sans` and `JetBrains Mono`), adaptive grid layouts, and zero-compromise mobile optimization.
- **Dark & Light Mode Toggle**: Smooth theme switching with persistent user preferences saved to `localStorage` and default system color-scheme detection.
- **Automated Confirmation Email System**:
  - Full-stack inquiry dispatch API powered by Express and Nodemailer.
  - Generates tracked reference IDs (`CONF-XXXXXX-XXXX`) for every inquiry.
  - Sends automated confirmation receipts quoting the user's message and delivery details.
  - Supports live SMTP configuration (e.g. Gmail App Password) with simulated pipeline fallback and on-screen email preview modal.
- **Google Analytics 4 Telemetry**:
  - Automatically loads and configures `gtag.js` with your GA Measurement ID.
  - Uses `IntersectionObserver` to track dwell times and section views (`#hero`, `#about`, `#skills`, `#projects`, `#contact`).
  - Tracks user interactions: resume downloads, social profile visits, filter interactions, and contact submissions.
  - Interactive, collapsible **Live GA4 Monitor** widget in the bottom-right corner for real-time telemetry inspection.
- **Comprehensive Sections**:
  - **Hero**: Executive summary, direct social links, downloadable CV, and live terminal profile card.
  - **Biography & Journey**: Educational background (B.Tech CSE), engineering principles, and interactive career milestone timeline.
  - **Skills & Toolkit**: Searchable, categorized technical competencies with proficiency bars and detailed concept breakdowns.
  - **Project Showcase**: Full-stack and frontend system case studies with source code links to GitHub.
  - **Contact Hub**: Accessible inquiry form with instant automated confirmation verification.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion animations.
- **Backend / API**: Node.js, Express, Nodemailer.
- **Tooling & Build**: Vite, esbuild, tsx.
- **Analytics**: Google Analytics 4 (`gtag.js`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm / yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohit2004Gothwal/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Fill in your configuration:
   ```env
   # Google Analytics 4 Measurement ID (from analytics.google.com)
   VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

   # Optional: Real SMTP email delivery (e.g., Gmail App Password)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="gothwalmohit03@gmail.com"
   SMTP_PASS="your-16-character-app-password"
   NOTIFICATION_EMAIL="gothwalmohit03@gmail.com"
   ```
   *(Note: If SMTP variables are left empty, the application will automatically queue and simulate receipt delivery with live previewing).*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3000`.

---

## 📦 Build & Deployment

To create an optimized production build:
```bash
npm run build
```
This runs `vite build` for the client assets and bundles the Express server using `esbuild` into `dist/server.cjs`.

To run the production server:
```bash
npm start
```

---

## 📂 Project Structure

```
├── .env.example               # Template for environment variables
├── index.html                 # HTML entry point with metadata and fonts
├── metadata.json              # Application description and platform capabilities
├── package.json               # Dependencies and scripts
├── server.ts                  # Express server with contact email API and Vite middleware
├── src/
│   ├── App.tsx                # Main application wrapper with theme and GA observer
│   ├── index.css              # Tailwind CSS imports and custom styles
│   ├── main.tsx               # Client React DOM entry point
│   ├── types.ts               # Shared TypeScript interfaces
│   ├── data/
│   │   └── portfolioData.ts   # Bio, milestones, skills, and project data
│   ├── lib/
│   │   └── analytics.ts       # GA4 initialization and custom event tracking
│   └── components/
│       ├── Navbar.tsx         # Header navigation, theme toggle, social links
│       ├── Hero.tsx           # Intro banner, quick links, code card, CV download
│       ├── About.tsx          # Biography, core principles, timeline
│       ├── Skills.tsx         # Searchable technical skills matrix
│       ├── Projects.tsx       # Filterable project case studies
│       ├── Contact.tsx        # Inquiry form with automated confirmation receipt
│       ├── AnalyticsMonitor.tsx # Collapsible live GA4 event monitor
│       └── Footer.tsx         # Quick links, copyright, and back-to-top button
└── tsconfig.json              # TypeScript configuration
```

---

## 👤 Author

**Mohit Kumar**
- **GitHub**: [@Mohit2004Gothwal](https://github.com/Mohit2004Gothwal)
- **LinkedIn**: [Mohit Kumar](https://www.linkedin.com/in/mohit-kumar-658338257/)
- **Email**: [gothwalmohit03@gmail.com](mailto:gothwalmohit03@gmail.com)

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).
