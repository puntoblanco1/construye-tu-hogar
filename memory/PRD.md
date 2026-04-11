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
- Homepage with full-screen Hero Carousel (4 auto-sliding villa images, navigation arrows, dot indicators), parallax dividers, blog section, journey cards, house prototypes, virtual tours, map section, projects
- Four Journey pages with multi-step forms (WhatsApp submission)
- About, Contact, FAQ, Privacy Policy, Terms pages
- GDPR Cookie Banner, full i18n (AR, EN, ES) with RTL

### Virtual Tour (Latest)
- Interactive SVG floor plans for all 3 casa prototypes (accurate dimensions from PDF)
- Clickable rooms open full-screen panoramic image viewer
- Drag-to-pan + auto-pan animation for immersive experience
- Room details: name, area, ceiling height (2.70m)
- Accessible from "Virtual Tour" button on each prototype card
- Works on both homepage (display) and ChooseNeighbors page (selectable)

### House Prototypes
- 3 prototype cards (Casa 1: 75m²/1bed, Casa 2: 88m²/2bed, Casa 3: 128m²/3bed)
- Detailed room breakdowns, "Most Popular" badge on Casa 2

### Map & Property Features
- 1,791 property markers with clustering, filters (region, municipality, price)
- Save/favorite system with auth modal

### Auth & Favorites
- Email+password + Google OAuth
- Favorites page, user menu, floating WhatsApp button

## Prioritized Backlog
### P1: Testimonials, Team section
### P2: Savings Calculator, Blog, Newsletter, Scroll animations
log
### P1: Testimonials, Team section
### P2: Savings Calculator, Blog, Newsletter, Scroll animations
