# Construye Tu Hogar - Complete Project Documentation
**URL:** https://property-hero-build.preview.emergentagent.com/

---

## 1. COMPLETE USER FLOW / USER JOURNEY

### NAVBAR (Desktop & Mobile)

| Element | Redirects To | Notes |
|---------|-------------|-------|
| Logo "CONSTRUYE TU HOGAR" | `/` (Homepage) | Scrolls to top |
| Our Projects | `/#projects` | Scrolls to Projects section on Homepage |
| About Us | `/about` | About page |
| FAQ | `/faq` | FAQ page |
| Contact | `/contact` | Contact page |
| Language Selector (EN/ES/AR) | N/A | Switches language globally (dropdown) |
| Login button | Opens `AuthModal` | Login/Register modal (see below) |
| User avatar (when logged in) | Dropdown menu | Shows: name, Favorites link, Logout |
| Favorites (logged in) | `/favorites` | Saved properties page |

### HERO SECTION (Homepage)

| Button | Redirects To | Notes |
|--------|-------------|-------|
| "Start Your Journey" | `#journey` | Scrolls to Journey Cards section on Homepage |
| "Learn More" | `/about` | About page |
| Phase indicators (1-4) | N/A | Switches between 4 background videos |

### JOURNEY CARDS (Homepage - 4 cards)

| Card | "Select This Path" Redirects To |
|------|--------------------------------|
| Choose Your Neighbors | `/journey/choose-neighbors` |
| Legal Asset Recovery | `/journey/legal-recovery` |
| Hospitality Assets | `/journey/hospitality-assets` |
| Retirement Oasis (Senior Living) | `/journey/senior-living` |

### PROJECTS SECTION (Homepage)

| Button | Redirects To |
|--------|-------------|
| "View Project Details" | `/project/37-villa-collection` |

### BLOG SECTION (Homepage - 3 cards)

| Card | Redirects To |
|------|-------------|
| "How to Save Up to 40%..." | `/blog/save-40-percent` |
| "Legal Guide: Buying Property..." | `/blog/legal-guide-foreigners` |
| "Valencia: The Rising Star..." | `/blog/valencia-rising-star` |

### FLOATING WHATSAPP WIDGET
- **Location:** Bottom-right corner, all pages
- **Action:** Opens WhatsApp chat (https://wa.me/34624156657)

### COOKIE BANNER
- **Actions:** Accept All / Reject / Privacy Policy link

### LOGIN / REGISTER MODAL (`AuthModal`)

| Field | Type | Notes |
|-------|------|-------|
| Full Name | text | Register mode only |
| Email | email | Both modes |
| Password | password | Both modes, toggle visibility |
| "Continue with Google" button | OAuth | Emergent-managed Google Auth |
| Toggle "Already have account?" / "Create account" | N/A | Switches login/register mode |

### FOOTER

| Link | Redirects To |
|------|-------------|
| Our Projects | `/#projects` |
| About Us | `/about` |
| Contact | `/contact` |
| FAQ | `/faq` |
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| Facebook icon | https://www.facebook.com/share/17eoof5B7R/?mibextid=wwXIfr |
| Instagram icon | https://www.instagram.com/construyetuhogarr/ |
| LinkedIn icon | https://www.linkedin.com/company/construye-tu-hogar/ |

---

## 2. DATABASE SCHEMA / DATA STRUCTURE

**Database:** MongoDB  
**DB Name:** `test_database`

### Collection: `users`
| Field | Type | Description |
|-------|------|-------------|
| user_id | string | Unique ID (format: `user_xxxxxxxxxxxx`) |
| email | string | User email |
| name | string | Full name |
| password_hash | string/null | bcrypt hash (null for Google users) |
| picture | string/null | Google profile picture URL |
| auth_provider | string | `"email"` or `"google"` |
| created_at | datetime | UTC timestamp |

### Collection: `user_sessions`
| Field | Type | Description |
|-------|------|-------------|
| user_id | string | References users.user_id |
| session_token | string | Format: `sess_xxxxxxxx` |
| expires_at | datetime | Expiry (7 days from creation) |
| created_at | datetime | UTC timestamp |

### Collection: `favorites`
| Field | Type | Description |
|-------|------|-------------|
| user_id | string | References users.user_id |
| property_id | integer | Property marker ID from Excel data |
| created_at | datetime | UTC timestamp |

### Collection: `status_checks`
| Field | Type | Description |
|-------|------|-------------|
| id | string | UUID |
| client_name | string | Client identifier |
| timestamp | datetime | UTC timestamp |

**Relationships:**
- `user_sessions.user_id` -> `users.user_id`
- `favorites.user_id` -> `users.user_id`

---

## 3. COMPLETE TECH STACK

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 (Create React App) |
| **Routing** | React Router DOM v7.5 |
| **CSS Framework** | TailwindCSS + tailwindcss-animate |
| **UI Components** | Shadcn/UI (Radix UI primitives) |
| **Icons** | Lucide React |
| **Maps** | Leaflet + React Leaflet + React Leaflet Cluster |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod validation |
| **Carousel** | Embla Carousel React |
| **Toasts** | Sonner |
| **Backend** | FastAPI (Python) |
| **Database** | MongoDB (Motor async driver) |
| **Auth** | bcrypt (passwords) + Session cookies + Emergent Google OAuth |
| **HTTP Client** | httpx (backend), axios (frontend) |
| **Hosting** | Emergent Platform (Kubernetes) |
| **State Management** | React Context API (LanguageContext, AuthContext) |

---

## 4. ENVIRONMENT VARIABLES

### Frontend (`/app/frontend/.env`)
| Variable | Purpose | Required |
|----------|---------|----------|
| `REACT_APP_BACKEND_URL` | Backend API base URL | Yes |
| `WDS_SOCKET_PORT` | WebSocket port for hot reload | Dev only |
| `ENABLE_HEALTH_CHECK` | Health check toggle | No |

### Backend (`/app/backend/.env`)
| Variable | Purpose | Required |
|----------|---------|----------|
| `MONGO_URL` | MongoDB connection string | Yes |
| `DB_NAME` | Database name | Yes |
| `CORS_ORIGINS` | Allowed CORS origins | Yes |

---

## 5. ASSETS INVENTORY

### Videos (`/app/frontend/public/videos/`)
| File | Usage | Source |
|------|-------|--------|
| `build-phase1.mp4` | Hero Phase 1 - Prefab Assembly | Pexels (31025072) |
| `build-phase3.mp4` | Hero Phase 2 - Building Progress | Pexels (original) |
| `build-phase2.mp4` | Hero Phase 3 - Module Installation | Mixkit |
| `hero-video.mp4` | Hero Phase 4 - Home Completion | Mixkit |

### Images (External URLs - Unsplash/Pexels)
| Usage | Source |
|-------|--------|
| Blog article images (3) | Unsplash |
| Parallax divider backgrounds | Unsplash |
| Journey card backgrounds | Unsplash |
| About page images | Unsplash |

### Icons
| Library | Usage |
|---------|-------|
| Lucide React | All UI icons (ArrowRight, Users, Heart, etc.) |

### Fonts
- System default / Tailwind default font stack

---

## 6. FORM CONFIGURATIONS

### Form 1: Contact Form (`/contact`)
| Field | Type | Required |
|-------|------|----------|
| Full Name | text | Yes |
| Email | email | Yes |
| Phone/WhatsApp | tel | Yes |
| Message | textarea | Yes |
- **Submission:** Opens WhatsApp with pre-filled message to +34624156657
- **Alternative:** Direct WhatsApp button + Email (mailto:) link

### Form 2: Choose Your Neighbors Journey (`/journey/choose-neighbors`)
**8-Step Form - All fields Required:**

**Step 1 - Identity:**
| Field | Type | Options |
|-------|------|---------|
| Group Type | select | Just me & family / Group <5 / Group >=5 |

**Step 2 - Land:**
| Field | Type | Options |
|-------|------|---------|
| Land Ownership | radio | I have land / Need help finding / Undecided |

**Step 3 - Design Selection:**
| Field | Type | Notes |
|-------|------|-------|
| 3D Design Selection | image cards | 3 casa prototypes (75m2, 88m2, 128m2) with zoom modal |

**Step 4 - Quality:**
| Field | Type | Options |
|-------|------|---------|
| Quality Tier | radio | Standard / Premium / Luxury |

**Step 5 - Budget:**
| Field | Type | Options |
|-------|------|---------|
| Budget Range | radio | <100K / 100-200K / 200-350K / 350-500K / 500K+ |

**Step 6 - Location:**
| Field | Type |
|-------|------|
| City | select (Spanish cities) |
| Min Area | select (m2) |
| Max Area | select (m2) |

**Step 7 - Preferences:**
| Field | Type |
|-------|------|
| Total Rooms | select |
| Master Bedrooms | select |
| Individual Rooms | select |
| Floors | select (1/2/3) |
| Finishing | select (Economic/Standard/Luxury) |
| Shared Pool | radio (Yes/No) |

**Step 8 - Contact:**
| Field | Type |
|-------|------|
| Full Name | text |
| Email | email |
| Country Code | text (default +34) |
| WhatsApp | text |

- **Submission:** Opens WhatsApp with all form data pre-filled to +34624156657

### Form 3: Login/Register Modal
- See AuthModal fields in Section 1 above
- **Submission:** POST to `/api/auth/register` or `/api/auth/login`

### Other Journey Forms (Legal Recovery, Hospitality, Senior Living)
- Similar multi-step format
- All submit via WhatsApp

---

## 7. EXTERNAL INTEGRATIONS

| Service | Purpose | Credentials |
|---------|---------|-------------|
| **Emergent Google OAuth** | Google social login | Managed by Emergent Platform (no keys needed) |
| **WhatsApp** | Form submissions & chat | Phone: +34624156657 (no API key) |
| **MongoDB** | Database | `MONGO_URL` in backend/.env |
| **OpenStreetMap + Leaflet** | Map tiles | Free, no API key |
| **Unsplash** | Stock images | Direct URLs, no API key |
| **Pexels** | Stock videos | Direct URLs, no API key |

---

## 8. API ENDPOINTS

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/session` | Google OAuth session exchange | No |
| GET | `/api/auth/me` | Get current user info | Yes (cookie/bearer) |
| POST | `/api/auth/logout` | Logout & clear session | Yes |
| POST | `/api/favorites/{property_id}` | Add property to favorites | Yes |
| DELETE | `/api/favorites/{property_id}` | Remove from favorites | Yes |
| GET | `/api/favorites` | Get user's favorite property IDs | Yes |
| GET | `/api/` | Health check | No |

---

## 9. ALL ROUTES / PAGES

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | HomePage | Main landing page |
| `/about` | AboutPage | About the company |
| `/contact` | ContactPage | Contact form |
| `/faq` | FAQPage | Frequently asked questions |
| `/privacy` | PrivacyPolicyPage | Privacy policy |
| `/terms` | TermsPage | Terms of service |
| `/favorites` | FavoritesPage | User's saved properties |
| `/journey/choose-neighbors` | ChooseNeighborsPage | 8-step neighbor journey |
| `/journey/legal-recovery` | LegalRecoveryPage | Legal recovery journey |
| `/journey/hospitality-assets` | HospitalityAssetsPage | Hospitality journey |
| `/journey/senior-living` | RetirementOasisPage | Senior living journey |
| `/project/37-villa-collection` | ProjectDetailsPage | Villa project details |
| `/blog/:slug` | BlogArticlePage | Individual blog article |

---

## 10. MULTI-LANGUAGE SUPPORT

| Language | Code | RTL |
|----------|------|-----|
| English | `en` | No |
| Spanish | `es` | No |
| Arabic | `ar` | Yes |

Managed via `LanguageContext` - all components read `useLanguage()` hook.

---

## 11. HOMEPAGE SECTIONS (Top to Bottom)

1. **Loading Screen** - Animated intro on first visit
2. **Hero Carousel** - 4 auto-playing construction videos with overlay text
3. **Journey Cards** - 4 paths (Choose Neighbors, Legal Recovery, Hospitality, Senior Living)
4. **Parallax Divider** - Background image with parallax scroll
5. **Industrialized Construction** - 6-step interactive explainer
6. **Parallax Divider** - Second divider
7. **Projects Section** - 37 Villa Collection with "View Details" button
8. **Blog Section** - 3 clickable article cards
9. **Footer** - Links, social media, company info
