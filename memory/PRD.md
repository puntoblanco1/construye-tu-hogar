# PRD - Construye Tu Hogar Website

## Original Problem Statement
Clone the website `https://property-hero-build.preview.emergentagent.com/` with pixel-perfect multi-page design, multi-language support (AR, EN, ES), RTL support for Arabic, and additional features.

## Architecture
- **Full-stack** React frontend + FastAPI backend + MongoDB
- React Router + TailwindCSS + shadcn/ui
- Custom i18n context for AR/EN/ES translations
- Leaflet + OpenStreetMap for interactive map
- JWT session-based auth (email+password + Google OAuth)

## What's Been Implemented

### Core Website
- Homepage with 4-phase Video Hero (construction montage), parallax dividers, blog section, journey cards, map section, projects
- Industrialized Construction 6-step explanatory section
- Scroll animations via useScrollReveal (Intersection Observer)
- Professional Loading Screen
- Four Journey pages with multi-step forms (WhatsApp submission)
- About, Contact, FAQ, Privacy Policy, Terms pages
- GDPR Cookie Banner, full i18n (AR, EN, ES) with RTL

### Blog System (Apr 2026)
- Blog section on homepage with 3 articles (Cost Savings, Legal Guide, Market Trends)
- Clickable blog cards navigate to `/blog/:slug` article pages
- Full article pages with hero image, markdown-like content rendering
- Multi-language support (EN, ES, AR)

### Choose Your Neighbors Journey
- 8-step form: Identity, Land, 3D Design (with zoom modal), Quality, Budget, Location, Preferences, Contact
- All filters required

### Map & Property Features
- 1,791 property markers with clustering, filters (region, municipality, price)
- Save/favorite system with auth modal

### Auth & Favorites
- Email+password + Google OAuth
- Favorites page, user menu, floating WhatsApp button

## Prioritized Backlog
### P1: Testimonials Section, Team Section
### P2: Savings Calculator, Newsletter Signup
