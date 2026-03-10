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
- Homepage with hero, journey cards, projects section, **interactive map section**
- Four Journey pages with multi-step forms (WhatsApp submission)
- About, Contact, FAQ, Privacy Policy, Terms pages
- GDPR Cookie Banner, full i18n (AR, EN, ES) with RTL

### Map & Property Features (March 10, 2025)
- Interactive map on homepage (`#opportunities` anchor) with 1,791 markers
- Filters: region, municipality, price range
- Search by municipality/address
- Marker clustering for performance
- Property popups with details, save button, WhatsApp contact

### Auth & Favorites System (March 10, 2025)
- Email+password registration and login
- Google OAuth via Emergent Auth
- Session-based auth with httpOnly cookies
- Favorites/likes system - heart button on property popups
- Auth modal appears when non-logged user tries to save
- Favorites page (`/favorites`) with saved properties and WhatsApp contact
- User menu in navbar (avatar, favorites count, logout)
- Floating WhatsApp button on all pages

## API Endpoints
- `POST /api/auth/register` - Register with name, email, password
- `POST /api/auth/login` - Login with email, password
- `POST /api/auth/session` - Google OAuth session exchange
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/favorites/{property_id}` - Add favorite
- `DELETE /api/favorites/{property_id}` - Remove favorite
- `GET /api/favorites` - List user's favorite property IDs

## DB Collections
- `users` - user_id, email, name, picture, password_hash, auth_provider
- `user_sessions` - user_id, session_token, expires_at
- `favorites` - user_id, property_id, created_at

## Prioritized Backlog

### P1 - High Priority
- Testimonials section on homepage
- Team section/page

### P2 - Medium Priority
- Interactive Savings Calculator
- Blog/Content section
- Newsletter signup form
