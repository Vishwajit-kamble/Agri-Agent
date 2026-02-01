<div align="center">
  <img width="1200" height="475" alt="AgriAgent Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AgriAgent – AI-Powered Agricultural Companion

AgriAgent is a web application that provides AI-driven crop diagnostics, market intelligence, and agricultural guidance tailored for farmers in the **Pune and Maharashtra** region. It combines real-time data, educational content, and smart farming tools in one place.

---

## Features

- **Crop Diagnosis** – Upload or capture a photo of your crop; AI (Google Gemini) analyzes it and returns disease/health insights, severity, and recommendations in your chosen language.
- **Market Intelligence** – Live mandi prices, price history charts, and alerts for crops (e.g. maize, wheat, paddy, soybean) with Pune APMC context.
- **Weather** – Current conditions and 5-day forecast for the region with irrigation advisories.
- **Government Schemes** – Browse and filter Central & State schemes (irrigation, finance, equipment, insurance) with eligibility and benefit details.
- **Digital Twin Simulation** – Prototype rule-based simulation to explore how irrigation and fertilizer choices affect predicted yield, soil sustainability, and cost.
- **AgriAcademy** – Course modules, live regional dashboard, and embedded educational videos (YouTube) on farming basics, irrigation, pest management, and agri-tech.
- **Finance** – Placeholder for future micro-loans, crop insurance, and expense tracking (coming soon).
- **AgriStore** – Placeholder for seeds, fertilizers, and tools marketplace (coming soon).
- **Sustainability** – Information on precision farming, soil health, and carbon tracking.
- **Team** – Project team and roles.
- **Multi-language** – Full UI and AI responses in **English**, **Marathi (मराठी)**, and **Hindi (हिंदी)**.
- **Dark mode** – Toggle with preference stored in `localStorage`.
- **Authentication** – Sign up / Sign in with email and password (Supabase); session persists across pages. Finance and alerts respect login state.

---

## Tech Stack

| Area        | Technology |
|------------|------------|
| Frontend   | React 19, TypeScript |
| Build      | Vite 6 |
| Styling    | Tailwind CSS (CDN), `darkMode: 'class'` |
| Charts     | Recharts |
| Auth       | Supabase (email/password) |
| AI         | Google Gemini API (crop image analysis) |
| Icons      | Lucide React |

---

## Project Structure

```
├── index.html              # Entry HTML, Tailwind + dark mode script
├── index.tsx                # React entry
├── App.tsx                  # Root app, routing, session, dark mode state
├── types.ts                 # Shared types (Page, DiagnosisResult, MarketPrice)
├── translations.ts          # en / mr / hi UI strings
├── vite.config.ts
├── tsconfig.json
├── lib/
│   └── supabase.ts          # Supabase client
├── services/
│   └── geminiService.ts     # Gemini crop image analysis
├── components/
│   ├── Navbar.tsx           # Nav, language switcher, dark toggle, login/user
│   ├── Footer.tsx
│   ├── ChatBot.tsx          # In-app AI chat
│   └── AgriVaani.tsx        # Voice assistant UI (demo)
├── pages/
│   ├── HomePage.tsx
│   ├── DiagnosePage.tsx     # Camera/upload + Gemini diagnosis
│   ├── MarketPage.tsx
│   ├── WeatherPage.tsx
│   ├── SchemesPage.tsx
│   ├── SimulationPage.tsx  # Digital Twin
│   ├── AcademyPage.tsx
│   ├── FinancePage.tsx
│   ├── StorePage.tsx
│   ├── SustainabilityPage.tsx
│   ├── TeamPage.tsx
│   └── LoginPage.tsx
├── public/
│   └── team/                # Team images
├── supabase_schema.sql      # Reference schema (if applicable)
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (or yarn/pnpm)
- **Gemini API key** – from [Google AI Studio](https://aistudio.google.com/apikey) (for crop diagnosis)
- Supabase project is preconfigured in code; replace URL/key in `lib/supabase.ts` if using your own project.

---

## Setup & Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agriagent---ai-agricultural-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**  
   Create a `.env` or `.env.local` in the project root and set:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   If the app reads the key via `import.meta.env`, use the `VITE_` prefix so Vite exposes it. If your code uses `process.env.API_KEY`, set `API_KEY` instead and ensure your build tool injects it.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open the URL shown in the terminal (e.g. `http://localhost:5173`).

5. **Production build**
   ```bash
   npm run build
   npm run preview   # optional: preview production build locally
   ```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` or `API_KEY` | Google Gemini API key for crop image analysis. Required for the Diagnose feature. |

Supabase URL and anon key are currently in `lib/supabase.ts`. For production, move them to environment variables and use `import.meta.env.VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (or your build’s equivalent).

---

## Key Behaviors

- **Crop diagnosis** – Uses Gemini to analyze a base64 image and return structured disease/severity/recommendations; language is passed so responses match UI language.
- **Auth** – Supabase handles sign up and sign in; email verification is disabled in flow; session is restored on load and redirects away from Login when already logged in.
- **Dark mode** – Stored in `localStorage` under `agriagent-theme` (`dark` / `light`); a script in `index.html` runs before paint to avoid flash.
- **Finance / Store** – Show “This feature is coming soon” and do not require login for viewing; loan/insurance actions show the same message.

---

## License

See [LICENSE](LICENSE) in the repository.
