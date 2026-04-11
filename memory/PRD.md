# PRD - Construye Tu Hogar Website

## Original Problem Statement
Clone the website `https://buildathome.preview.emergentagent.com/` with pixel-perfect multi-page design, multi-language support (AR, EN, ES), RTL support for Arabic, and additional features.

## Architecture
- **Full-stack** React frontend + FastAPI backend + MongoDB
- React Router + TailwindCSS + shadcn/ui
- Custom i18n context for AR/EN/ES translations
- Leaflet + OpenStreetMap for interactive map
- JWT session-based auth (email+password + Google OAuth)
- Static JSON data from parsed Excel file (1,791 properties)

## What's Been Implemented

### Core Website
- Homepage with hero, journey cards, house prototypes, map section, projects
- Four Journey pages with multi-step forms (WhatsApp submission)
- About, Contact, FAQ, Privacy Policy, Terms pages
- GDPR Cookie Banner, full i18n (AR, EN, ES) with RTL

### House Prototypes (March 11, 2025)
- 3 prototype cards (Casa 1: 75m²/1bed, Casa 2: 88m²/2bed, Casa 3: 128m²/3bed)
- Shown on homepage (display only) and ChooseNeighbors page (selectable)
- Detailed room breakdowns with areas
- Selection included in WhatsApp form submission
- Casa 2 marked as "Most Popular"

### Map & Property Features (March 10, 2025)
- Interactive map on homepage with 1,791 markers
- Filters: region, municipality, price range
- Marker clustering, property popups with save/contact

### Auth & Favorites System (March 10, 2025)
- Email+password + Google OAuth registration/login
- Favorites/likes system with auth modal for non-logged users
- Favorites page, user menu in navbar
- Floating WhatsApp button on all pages

## Prioritized Backlog

### P1 - High Priority
- Testimonials section on homepage
- Team section/page

### P2 - Medium Priority
- Interactive Savings Calculator
- Blog/Content section
- Newsletter signup form
- Scroll animations (AOS-style)
- Animated number counters
