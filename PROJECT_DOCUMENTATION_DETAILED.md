# Construye Tu Hogar - DETAILED Technical Documentation
**URL:** https://property-hero-build.preview.emergentagent.com/
**Date:** May 2026

---

# 1. COMPLETE 8-STEP JOURNEY FLOW

**Page:** `/journey/choose-neighbors` (`ChooseNeighborsPage.jsx`)  
**Entry Points:** Homepage Journey Card "Choose Your Neighbors" -> Click "Get Started" on the page

### Navigation & UX
- **Progress Indicator:** Yes - Visual stepper component (`Stepper.jsx`) showing all 8 steps with labels
- **Can go back:** Yes - "Previous" button appears from Step 2 onwards
- **Abandon behavior:** No data is saved. Form state is in React `useState` only. If user closes the modal or navigates away, all data is lost
- **Data storage:** Form data is NOT saved to database. It is sent directly via WhatsApp message
- **Form opens as:** Full-screen overlay modal with close button (X)

### Step-by-Step Detail

#### Step 1: Identity (الهوية)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Group Type | Select dropdown | "Just me and my family" / "Group < 5 families" / "Group >= 5 families" | Yes |

#### Step 2: Land (الأرض)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Land Ownership | Radio buttons | "Yes, I own it" / "Decided, pending purchase" / "Looking for land" / "No" | Yes |

#### Step 3: Design (التصميم)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Selected Design | Image card selection | Casa 1 (75m2, 1 bed, 1 bath) / Casa 2 (100m2, 2 bed, 2 bath) / Casa 3 (128m2, 3 bed, 2 bath) | Yes |
- **Special Feature:** Click on image opens full-screen zoom modal
- **Design images:** `/designs/casa-1-75m2.png`, `/designs/casa-2-100m2.png`, `/designs/casa-3-128m2.png`

#### Step 4: Quality (الجودة)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Quality Tier | Card buttons (4 options) | Essential (basic compliance) / Premium (exceeds standards) / Excellent (optimized comfort) / Nature (near PassiveHaus, near-zero consumption) | Yes |
- Each option has icon (Shield/Award/Star/Leaf) and description

#### Step 5: Budget (الميزانية)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Budget Range | Radio buttons | +480,000 EUR / 300,000-480,000 EUR / 150,000-300,000 EUR / -150,000 EUR | Yes |

#### Step 6: Location (الموقع)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| City | Select dropdown | List of Spanish cities (from `data/cities.js`) | Yes |
| Min Area | Select dropdown | 100m2 to 5000m2 (step 100) | Yes |
| Max Area | Select dropdown | 100m2 to 5000m2 (step 100) | Yes |

#### Step 7: Preferences (التفضيلات)
| Field | Type | Options | Required |
|-------|------|---------|----------|
| Total Rooms | Select dropdown | 1-10 | Yes |
| Master Bedrooms | Select dropdown | 1-10 | Yes |
| Individual Rooms | Select dropdown | 1-10 | Yes |
| Floors | Select dropdown | 1 / 2 / 3 | Yes |
| Finishing | Select dropdown | Economic / Standard / Luxury | Yes |
| Shared Pool | Radio buttons | Yes / No | Yes |

#### Step 8: Contact (التواصل)
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Full Name | Text input | None | Yes |
| Email | Email input | HTML email validation | Yes |
| Country Code | Text input | Default: +34 | Yes |
| WhatsApp | Text input | None | Yes |

**Final Step Action:** 
- Button: "Submit via WhatsApp"
- Opens new tab with WhatsApp URL: `https://wa.me/34673365300?text={encoded_message}`
- Message includes ALL form data formatted as key:value pairs
- Shows success toast notification
- Does NOT save to database

---

# 2. DASHBOARD / USER PAGES

**There is NO dedicated dashboard page.** The user experience after login:

### Logged-in User Features:
- **Navbar:** Shows user avatar/name dropdown with:
  - Favorites link
  - Logout button
- **Favorites Page** (`/favorites`): Lists all saved property IDs
- **Profile Editing:** NOT available - no profile edit functionality exists
- **Notifications:** None
- **Charts/Tables:** None

### Favorites Page (`/favorites`)
- Displays property IDs that user has saved
- Can remove favorites
- Requires authentication (redirects if not logged in)

---

# 3. AUTHENTICATION SYSTEM

### Login Methods
1. **Email/Password** - Custom implementation with bcrypt
2. **Google OAuth** - Emergent-managed Google Auth

### Registration Flow (Email)
1. User clicks "Login" in navbar -> AuthModal opens in "register" mode
2. Fills: Full Name, Email, Password (min 6 chars)
3. POST `/api/auth/register` -> Creates user + session
4. Session cookie set automatically (`session_token`, httpOnly, secure, SameSite=none)
5. Modal closes, user is logged in

### Login Flow (Email)
1. User clicks "Login" -> AuthModal opens
2. Clicks "Already have an account?" to switch to login mode
3. Fills: Email, Password
4. POST `/api/auth/login` -> Validates bcrypt hash -> Creates session
5. Session cookie set, modal closes

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Redirects to `https://auth.emergentagent.com/?redirect={origin}/`
3. Google auth happens on Emergent's auth server
4. Redirects back to app with `#session_id=xxx` in URL hash
5. `AuthCallback` component detects hash, calls POST `/api/auth/session`
6. Backend exchanges session_id with Emergent API to get Google profile
7. Creates/updates user, creates session, sets cookie
8. Redirects to homepage

### Session Management
- **Type:** Cookie-based sessions stored in MongoDB
- **Cookie name:** `session_token`
- **Format:** `sess_{uuid_hex}`
- **Expiry:** 7 days
- **Cookie flags:** httpOnly, secure, SameSite=none
- **Auth check:** On every page load, GET `/api/auth/me` checks session validity

### Password Reset
- **NOT implemented** - No password reset flow exists

### User Roles
- **Single role only** - No admin/user/guest differentiation
- All authenticated users have same permissions

### Data Collected at Registration
| Field | Source | Stored As |
|-------|--------|-----------|
| name | User input / Google profile | `users.name` |
| email | User input / Google profile | `users.email` |
| password | User input (bcrypt hashed) | `users.password_hash` (null for Google) |
| picture | Google profile only | `users.picture` |
| auth_provider | Auto-detected | `"email"` or `"google"` |

---

# 4. ALL API ENDPOINTS - DETAILED

### POST `/api/auth/register`
```
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}

Success Response (200):
{
  "user_id": "user_a1b2c3d4e5f6",
  "email": "john@example.com",
  "name": "John Doe",
  "picture": null
}
+ Set-Cookie: session_token=sess_xxx

Error Response (400):
{ "detail": "Email already registered" }
```

### POST `/api/auth/login`
```
Request Body:
{
  "email": "john@example.com",
  "password": "secret123"
}

Success Response (200):
{
  "user_id": "user_a1b2c3d4e5f6",
  "email": "john@example.com",
  "name": "John Doe",
  "picture": null
}
+ Set-Cookie: session_token=sess_xxx

Error Response (401):
{ "detail": "Invalid credentials" }
```

### POST `/api/auth/session` (Google OAuth)
```
Request Body:
{ "session_id": "google_session_id_from_hash" }

Success Response (200):
{
  "user_id": "user_a1b2c3d4e5f6",
  "email": "john@gmail.com",
  "name": "John Doe",
  "picture": "https://lh3.googleusercontent.com/..."
}

Error Responses:
400: { "detail": "session_id required" }
401: { "detail": "Invalid Google session" }
```

### GET `/api/auth/me`
```
Auth: Required (session_token cookie or Authorization: Bearer token)

Success Response (200):
{
  "user_id": "user_a1b2c3d4e5f6",
  "email": "john@example.com",
  "name": "John Doe",
  "picture": null
}

Error Responses:
401: { "detail": "Not authenticated" }
401: { "detail": "Invalid session" }
401: { "detail": "Session expired" }
401: { "detail": "User not found" }
```

### POST `/api/auth/logout`
```
Auth: Required (cookie)

Success Response (200):
{ "message": "Logged out" }
+ Deletes session_token cookie
+ Removes session from MongoDB
```

### POST `/api/favorites/{property_id}`
```
Auth: Required
URL param: property_id (integer)

Success Response (200):
{ "message": "Added to favorites" }
OR
{ "message": "Already in favorites" }

Error: 401 if not authenticated
```

### DELETE `/api/favorites/{property_id}`
```
Auth: Required
URL param: property_id (integer)

Success Response (200):
{ "message": "Removed from favorites" }
```

### GET `/api/favorites`
```
Auth: Required

Success Response (200):
[1, 5, 23, 156]  // Array of property_id integers

Error: 401 if not authenticated
```

### GET `/api/`
```
Response (200):
{ "message": "Hello World" }
```

---

# 5. DATABASE - FULL SCHEMA

### Collection: `users`
| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| _id | ObjectId | Auto | Auto | MongoDB auto-generated (excluded from API responses) |
| user_id | string | Yes | `user_{uuid_hex[:12]}` | Unique identifier |
| email | string | Yes | - | Unique per user |
| name | string | Yes | - | Full name |
| password_hash | string/null | No | - | bcrypt hash. Null for Google users |
| picture | string/null | No | null | Google profile picture URL |
| auth_provider | string | Yes | - | `"email"` or `"google"` |
| created_at | datetime | Yes | `datetime.now(UTC)` | Registration timestamp |

**Sample Record:**
```json
{
  "user_id": "user_a1b2c3d4e5f6",
  "email": "ahmed@example.com",
  "name": "Ahmed Mohamed",
  "password_hash": "$2b$12$LJ3m4...",
  "picture": null,
  "auth_provider": "email",
  "created_at": "2026-04-15T10:30:00Z"
}
```

### Collection: `user_sessions`
| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| _id | ObjectId | Auto | Auto | Excluded from queries |
| user_id | string | Yes | - | References `users.user_id` |
| session_token | string | Yes | `sess_{uuid_hex}` | Cookie value |
| expires_at | datetime | Yes | Now + 7 days | Session expiry |
| created_at | datetime | Yes | Now | Creation time |

**Sample Record:**
```json
{
  "user_id": "user_a1b2c3d4e5f6",
  "session_token": "sess_abc123def456ghi789",
  "expires_at": "2026-04-22T10:30:00Z",
  "created_at": "2026-04-15T10:30:00Z"
}
```

### Collection: `favorites`
| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| _id | ObjectId | Auto | Auto | Excluded |
| user_id | string | Yes | - | References `users.user_id` |
| property_id | integer | Yes | - | Property marker ID |
| created_at | datetime | Yes | Now | When favorited |

**Sample Record:**
```json
{
  "user_id": "user_a1b2c3d4e5f6",
  "property_id": 156,
  "created_at": "2026-04-16T14:20:00Z"
}
```

### Collection: `status_checks`
| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| id | string | Yes | UUID | Health check ID |
| client_name | string | Yes | - | Client identifier |
| timestamp | datetime | Yes | Now | Check time |

---

# 6. ALL PAGES - CONTENT & LAYOUT

### 1. Homepage `/`
- **Sections:** Loading Screen -> Hero Carousel (4 videos) -> Journey Cards (4 paths) -> Parallax Divider 1 -> Industrialized Construction (6 steps) -> Parallax Divider 2 -> Projects Section -> Blog Section (3 articles) -> Footer
- **Dynamic content:** Language-dependent text via `LanguageContext`
- **Data sources:** All hardcoded in components (no API calls)

### 2. About Page `/about`
- **Content:** Company story, mission, values, team overview
- **Static content:** Yes, text + stock images

### 3. Contact Page `/contact`
- **Sections:** Contact form + Company info cards (WhatsApp, Email, Address)
- **Form:** Name, Email, Phone, Message -> Sends via WhatsApp or Email
- **WhatsApp number:** +34673365300
- **Email:** info@construyetuhogar.es

### 4. Choose Neighbors Journey `/journey/choose-neighbors`
- **Sections:** Hero -> Benefits (3 cards) -> Features checklist -> CTA -> 8-step Form (modal)
- **See Section 1 above for full form details**

### 5. Legal Recovery Journey `/journey/legal-recovery`
- **Content:** Simple info page with hero section
- **Lines:** 45 lines - minimal content

### 6. Hospitality Assets Journey `/journey/hospitality-assets`
- **Content:** Simple info page with hero section
- **Lines:** 44 lines - minimal content

### 7. Senior Living Journey `/journey/senior-living`
- **Content:** Simple info page with hero section
- **Lines:** 46 lines - minimal content

### 8. Project Details `/project/37-villa-collection`
- **Content:** Villa collection details, gallery, specifications
- **Lines:** 131 lines
- **Static content:** Yes

### 9. FAQ Page `/faq`
- **Content:** Accordion-style FAQ items
- **Multi-language:** Yes
- **Lines:** 214 lines

### 10. Privacy Policy `/privacy`
- **Content:** Full GDPR privacy policy text
- **Lines:** 238 lines

### 11. Terms of Service `/terms`
- **Content:** Full terms and conditions text
- **Lines:** 277 lines

### 12. Favorites Page `/favorites`
- **Dynamic content:** Yes - fetches user favorites from API
- **Requires auth:** Yes
- **Lines:** 164 lines

### 13. Blog Article Page `/blog/:slug`
- **Dynamic content:** Based on URL slug (3 articles available)
- **Slugs:** `save-40-percent`, `legal-guide-foreigners`, `valencia-rising-star`
- **Content:** Hero image, title, category, date, read time, full article body
- **Data source:** Hardcoded in `BlogArticlePage.jsx` (not from database)
- **Multi-language:** Yes (EN, ES, AR)

---

# 7. ENVIRONMENT VARIABLES

### Frontend (`/app/frontend/.env`)
| Variable | Value | Sensitive | Usage | How to Obtain |
|----------|-------|-----------|-------|---------------|
| `REACT_APP_BACKEND_URL` | `https://property-hero-build.preview.emergentagent.com` | No | All API calls base URL | Provided by Emergent platform |
| `WDS_SOCKET_PORT` | `443` | No | Dev hot-reload WebSocket | Standard config |
| `ENABLE_HEALTH_CHECK` | `false` | No | Health check toggle | Static config |

### Backend (`/app/backend/.env`)
| Variable | Value | Sensitive | Usage | How to Obtain |
|----------|-------|-----------|-------|---------------|
| `MONGO_URL` | `mongodb://localhost:27017` | Yes | MongoDB connection | MongoDB installation |
| `DB_NAME` | `test_database` | No | Database name | User-defined |
| `CORS_ORIGINS` | `*` | No | Allowed CORS origins | User-defined |

---

# 8. EXTERNAL SERVICES

### Google OAuth (Emergent-managed)
- **Auth URL:** `https://auth.emergentagent.com/`
- **Session Exchange URL:** `https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data`
- **Redirect URL:** `{window.location.origin}/`
- **Scopes:** Managed by Emergent (email, profile)
- **Client ID:** Managed by Emergent (no user config needed)
- **How it works:** Emergent handles OAuth flow, returns session_id which backend exchanges for user profile

### WhatsApp Business
- **Phone Numbers Used:**
  - Contact page: +34673365300
  - Journey form: +34673365300
  - Floating widget: +34624156657 (different number)
- **Integration type:** Simple URL scheme (`https://wa.me/{number}?text={message}`)
- **No API key needed** - uses public WhatsApp URL

### MongoDB
- **Connection:** `mongodb://localhost:27017`
- **Database:** `test_database`
- **Driver:** Motor (async Python driver)
- **No auth** configured on local MongoDB

### OpenStreetMap / Leaflet
- **Tile server:** Default OpenStreetMap tiles (free)
- **No API key required**
- **Usage limits:** Standard OSM tile usage policy
- **Note:** MapSection component exists but was REMOVED from homepage

---

# 9. ALL FORMS - COMPLETE

### Form 1: Contact Page (`/contact`)
| Field | Type | Placeholder | Required |
|-------|------|-------------|----------|
| Full Name | text | "John Doe" | Yes |
| Email | email | "john@example.com" | Yes |
| Phone/WhatsApp | tel | "+34 600 000 000" | Yes |
| Message | textarea | "Tell us about your project..." | Yes |

**Submit Actions (3 options):**
1. **WhatsApp Submit button:** Opens `https://wa.me/34673365300?text={formatted_message}`
2. **Send Email button:** Opens `mailto:info@construyetuhogar.es?subject={subject}&body={body}`
3. **Direct WhatsApp button:** Opens `https://wa.me/34673365300`

**Success:** Clears form fields, shows success state
**Error:** No error handling (client-side only)
**Storage:** NOT saved to database

### Form 2: Auth Modal (Login)
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Email | email | HTML email | Yes |
| Password | password | None | Yes |

**Submit:** POST `/api/auth/login`
**Success:** Closes modal, sets user state
**Error:** Shows error text below form (e.g. "Invalid credentials")

### Form 3: Auth Modal (Register)
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Full Name | text | None | Yes |
| Email | email | HTML email | Yes |
| Password | password | Min 6 chars (JS check) | Yes |

**Submit:** POST `/api/auth/register`
**Success:** Closes modal, sets user state
**Error:** Shows error text (e.g. "Email already registered")

### Form 4: Choose Neighbors Journey
- **See Section 1 above** - 8 steps, 17+ fields total
- **Submit:** WhatsApp message
- **Storage:** None (client-side state only)

### Form 5: Cookie Banner
| Action | Result |
|--------|--------|
| Accept All | Sets `localStorage.cookieConsent = 'accepted'`, hides banner |
| Reject | Sets `localStorage.cookieConsent = 'rejected'`, hides banner |

---

# 10. ASSETS - COMPLETE LIST

### Videos (Local - `/public/videos/`)
| File | Duration | Resolution | Usage | Source |
|------|----------|------------|-------|--------|
| build-phase1.mp4 | ~15s | 1920x1080 | Hero Phase 1 (Prefab Assembly) | Pexels #31025072 |
| build-phase3.mp4 | ~15s | varies | Hero Phase 2 (Building Progress) | Pexels (original) |
| build-phase2.mp4 | ~15s | 720p | Hero Phase 3 (Module Installation) | Mixkit |
| hero-video.mp4 | ~15s | 720p | Hero Phase 4 (Home Completion) | Mixkit |

### Design Images (Local - `/public/designs/`)
| File | Usage |
|------|-------|
| casa-1-75m2.png | Journey Step 3 - Casa 1 floor plan |
| casa-2-100m2.png | Journey Step 3 - Casa 2 floor plan |
| casa-3-128m2.png | Journey Step 3 - Casa 3 floor plan |

### External Images (Unsplash)
| URL | Usage |
|-----|-------|
| photo-1600607687939-ce8a6c25118c | Blog article 1 image |
| photo-1600585154340-be6161a56a0c | Blog article 2 image / Journey page |
| photo-1613490493576-7fde63acd811 | Blog article 3 image |

### Icons
- **Library:** Lucide React v0.507
- **Icons used:** ArrowRight, ArrowLeft, ArrowUpRight, Users, TrendingUp, Home, Scale, Building2, CheckCircle, MapPin, Heart, X, Mail, Lock, User, Eye, EyeOff, Calendar, Clock, Shield, Award, Star, Leaf, ZoomIn, Search, Filter, Menu, ChevronDown, Globe, ExternalLink, Phone, MessageCircle

### Fonts
- **Primary:** Tailwind default (system font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **No custom fonts loaded**

---

# 11. STATE MANAGEMENT

### React Context API (2 contexts)

#### `AuthContext` (`/context/AuthContext.js`)
| State | Type | Description |
|-------|------|-------------|
| user | object/null | Current user data (user_id, email, name, picture) |
| loading | boolean | Auth check in progress |
| favorites | array[int] | List of favorited property IDs |

**Methods:** login(), register(), googleLogin(), logout(), toggleFavorite(), isFavorite(), loadFavorites()

#### `LanguageContext` (`/context/LanguageContext.js`)
| State | Type | Description |
|-------|------|-------------|
| language | string | Current language ('en', 'es', 'ar') |
| t | object | Translation strings for current language |

**Persistence:** Language stored in `localStorage.language`

### Form State (ChooseNeighborsPage)
- **Type:** Local `useState` in component
- **17 fields** in single state object `fd`
- **NOT persisted** - lost on page refresh or navigation

### Cookie Consent
- **Storage:** `localStorage.cookieConsent` = 'accepted' | 'rejected'
- Checked on every page load by `CookieBanner` component

### Session Management
- **Cookie:** `session_token` (httpOnly, not accessible from JS)
- **Auth check:** On app load, `AuthContext` calls GET `/api/auth/me`
- **If valid:** Sets user state, loads favorites
- **If invalid:** User remains null (guest mode)

---

# 12. ERROR HANDLING & LOGGING

### Frontend
- **Auth errors:** Displayed as red text below form fields in AuthModal
- **API errors:** Caught in try/catch, error message from `response.detail` shown
- **Toast notifications:** Using `sonner` library for success/info messages
- **No error tracking service** (no Sentry, LogRocket, etc.)
- **Console errors:** Standard React error boundaries (none custom)

### Backend
- **Logging:** Python `logging` module, level=INFO
- **Format:** `%(asctime)s - %(name)s - %(levelname)s - %(message)s`
- **HTTP errors:** FastAPI `HTTPException` with status codes and detail messages
- **Unhandled errors:** FastAPI default 500 response
- **No external logging service**

---

# 13. SECURITY MEASURES

### CORS
```python
CORSMiddleware(
    allow_credentials=True,
    allow_origins=["*"],  # Currently allows all origins
    allow_methods=["*"],
    allow_headers=["*"],
)
```
**Note:** CORS is wide open (`*`). Should be restricted in production.

### Authentication
- **Password hashing:** bcrypt with auto-generated salt
- **Session tokens:** UUID-based, not predictable
- **Cookie security:** httpOnly (no JS access), secure (HTTPS only), SameSite=none

### What's Missing (NOT implemented)
- **Rate limiting:** None
- **Input sanitization:** No explicit sanitization (relies on Pydantic validation)
- **CSRF protection:** None
- **Brute force protection:** None (no login attempt limits)
- **Password complexity:** Only min 6 chars (frontend check only)
- **Email verification:** None
- **Account lockout:** None
- **XSS protection:** React's default JSX escaping only
- **SQL injection:** N/A (MongoDB, but no NoSQL injection protection beyond Pydantic)

---

# 14. DEPLOYMENT CONFIGURATION

### Platform
- **Hosting:** Emergent Platform (Kubernetes cluster)
- **Container:** Single pod with frontend + backend + MongoDB

### Architecture
```
[Client Browser]
       |
[Kubernetes Ingress]
       |
   /api/* --> Backend (FastAPI, port 8001)
   /*     --> Frontend (React, port 3000)
       |
   [MongoDB localhost:27017]
```

### Build Process
- **Frontend:** `react-scripts build` (Create React App)
- **Backend:** Python with uvicorn (managed by supervisor)
- **Process Manager:** Supervisor
  - `frontend`: React dev server on port 3000
  - `backend`: FastAPI/uvicorn on port 8001

### Hot Reload
- **Frontend:** Webpack Dev Server (auto-reload on file changes)
- **Backend:** Uvicorn with reload flag

### CI/CD
- **No CI/CD pipeline** - Changes deployed via Emergent platform commits
- **Git:** Local git repository, no automated deployment pipeline
- **Save to GitHub:** Available via Emergent platform UI

### Dependencies
- **Frontend:** `yarn` for package management (`package.json`)
- **Backend:** `pip` for Python packages (`requirements.txt`)

### Key Files Structure
```
/app/
├── backend/
│   ├── server.py            (Main FastAPI app - 262 lines)
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── public/
│   │   ├── videos/          (4 MP4 hero videos)
│   │   └── designs/         (3 PNG floor plans)
│   ├── src/
│   │   ├── App.js           (Router - 115 lines)
│   │   ├── components/      (14 components)
│   │   ├── context/         (AuthContext.js, LanguageContext.js)
│   │   ├── data/            (cities.js)
│   │   ├── hooks/           (useScrollReveal.js, use-toast.js)
│   │   └── pages/           (13 pages)
│   ├── package.json
│   └── .env
└── PROJECT_DOCUMENTATION.md
```
