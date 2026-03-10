# PRD - Construye Tu Hogar Website

## Original Problem Statement
Clone the website `https://buildathome.preview.emergentagent.com/` with pixel-perfect multi-page design, multi-language support (AR, EN, ES), RTL support for Arabic, and additional features.

## Architecture
- **Frontend-only** React application (no backend in active use)
- React + React Router + TailwindCSS + shadcn/ui
- Custom i18n context for AR/EN/ES translations
- Leaflet + OpenStreetMap for interactive map
- Static JSON data from parsed Excel file (1,791 properties)

## What's Been Implemented

### Core Website (Previous Sessions)
- Homepage with hero, journey cards, projects section
- Four Journey pages with multi-step forms (WhatsApp submission)
- About page
- Contact page (WhatsApp + Email)
- FAQ page with search/filter (trilingual)
- Privacy Policy & Terms of Service pages
- GDPR Cookie Banner
- Full i18n (AR, EN, ES) with RTL support
- Logo and social media links customized
- Scroll-to-top on navigation

### New Features (March 10, 2025)
- **Interactive Map Page** (`/opportunities`): 1,791 property markers from Excel data displayed on Leaflet/OpenStreetMap with marker clustering, search, and filters (region, province, use type)
- **Floating WhatsApp Button**: Persistent green button on all pages linking to +34 673 365 300 with tooltip on hover
- Navigation links for Opportunities added to Navbar (desktop + mobile) and Footer

## Prioritized Backlog

### P1 - High Priority
- Testimonials section on homepage
- Team section/page

### P2 - Medium Priority
- Backend & Database integration (save form submissions to MongoDB)
- Interactive Savings Calculator
- Blog/Content section
- Newsletter signup form

## Key Files
- `/app/frontend/src/pages/OpportunitiesPage.jsx` - Map page
- `/app/frontend/src/components/FloatingWhatsApp.jsx` - WhatsApp button
- `/app/frontend/src/data/properties.json` - 1,791 property records
- `/app/frontend/src/i18n/translations.js` - All translations
- `/app/frontend/src/App.js` - Routes and layout
- `/app/frontend/src/components/Navbar.jsx` - Navigation
- `/app/frontend/src/components/Footer.jsx` - Footer

## Technical Notes
- WhatsApp number: +34 673 365 300
- Map uses free Leaflet + OpenStreetMap (no API key needed)
- Marker clustering via react-leaflet-cluster for performance with 1,791+ markers
- Property data parsed from `SUELOS Y WIPS ESPANA.xlsx` (both sheets)
