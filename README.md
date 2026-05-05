# QuickFix

Trusted local help, powered by AI.

## Project Links

- Live Demo: https://quickfix-red.vercel.app/
- GitHub: https://github.com/Binyameinshougar/quickfix

QuickFix is a local services marketplace MVP that helps customers post service requests, receive offers from nearby providers, compare trust signals, and choose the best provider. The product uses mock AI logic to analyze service problems, detect urgency, estimate price ranges, recommend safety steps, and create provider-facing job summaries.

The first version is free for customers and providers. It does not include subscriptions, commissions, or real payments. The goal is to validate the local supply-and-demand marketplace loop before adding monetization.

## Features

- Premium responsive landing page with demo walkthrough, service categories, trust messaging, and bilingual notes
- English and Spanish language switcher with `localStorage` persistence
- Service categories for home repair, moving, cleaning, delivery, tax help, translation, web design, student help, and general local services
- Post request flow with category, description, city, preferred time, urgency, photo placeholder, smart follow-up questions, and AI analysis
- Mock AI analyzer for urgency, possible issue, recommended first action, safety tips, estimated price range, and provider summary
- Browse requests page and request details page with provider offer placeholders
- Offers page with provider comparison by price, ETA, rating, completed jobs, verification, Trust Score, Reliability Score, and match reason
- Professional provider cards and public provider profiles with profile photo, portfolio, packages, languages, badges, reviews, work history, and verification levels
- Customer dashboard for requests, offers, job timeline, provider cards, empty states, and protection links
- Provider dashboard with profile builder, verification placeholders, nearby requests, offer actions, and reputation signals
- Chat UI for customer, provider, and assistant messages with quick questions and photo upload placeholder
- Protection Center for damage, no-show, and dispute report demos
- Admin dashboard for users, providers, requests, offers, KYC, categories, disputes, no-shows, and platform metrics
- Pitch page and showcase page for judges, recruiters, employers, and portfolio review

## Tech Stack

- Framework: Next.js App Router
- UI: React, TypeScript, Tailwind CSS
- Icons: Lucide React
- Data: Local mock data in `src/lib/demo-data.ts`
- AI logic: Mock helper functions in `src/lib/ai.ts`
- i18n: Lightweight custom language provider in `src/components/language-provider.tsx`
- Deployment target: Vercel

## Routes

- `/` - Home page
- `/showcase` - AI showcase page
- `/pitch` - Startup pitch page
- `/services` - Service categories
- `/request` - Post a service request
- `/analysis` - AI request analysis
- `/requests` - Browse customer requests
- `/requests/job-001` - Request details
- `/offers` - Compare provider offers
- `/jobs/job-001` - Job details and timeline
- `/providers/ahmed-plumbing` - Public provider profile
- `/dashboard/customer` - Customer dashboard
- `/dashboard/provider` - Provider dashboard
- `/auth` - Demo login and signup
- `/chat` - Chat demo
- `/protection` - Protection Center
- `/admin` - Admin dashboard
- `/business-model` - Future business model
- `/provider/plans` - Free launch and future provider plan concepts
- `/escrow` - Future payment placeholder

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run lint
npm run build
```

## AI Mock Architecture

The MVP does not call a real AI API yet. It keeps AI behavior isolated so a production API can be added later without rebuilding the UI.

- `src/lib/ai.ts` contains `analyzeProblem`, `fairPriceMessage`, and `buildProviderProfile`
- `analyzeProblem` classifies category, urgency, possible issue, first action, safety warning, price range, best provider type, provider summary, and photo analysis text
- `fairPriceMessage` compares provider offers against the demo estimated range
- `buildProviderProfile` turns rough provider notes into a professional bio, skills, service packages, and suggested price range
- UI components consume the mock results through typed objects, making a future API route or server action straightforward

## Deploy To Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. In Vercel, create a new project and import the repository.
3. Use the default Next.js framework settings.
4. Build command: `npm run build`
5. Install command: `npm install`
6. Output directory: leave empty; Vercel detects Next.js automatically.
7. Add environment variables later only when real auth, database, AI, storage, or payment integrations are introduced.
8. Deploy and test these routes first: `/`, `/showcase`, `/request`, `/analysis`, `/offers`, `/providers/ahmed-plumbing`, `/chat`, `/protection`, and `/admin`.

## Future Improvements

- Add real authentication and role-based access control
- Add database storage for users, providers, requests, offers, messages, reviews, and disputes
- Add production AI API integration for request intake, summaries, price checks, safety tips, and matching
- Add city-based search, geolocation, and provider service-area filtering
- Add real-time messaging and notifications
- Add provider onboarding, document review, and admin moderation workflows
- Add upload storage for request photos, KYC documents, portfolio photos, and damage reports
- Add optional payments, escrow, and commission only after marketplace demand is validated
- Add more languages, including Arabic support
