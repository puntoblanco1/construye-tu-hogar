# Construye Tu Hogar - Build at Cost Website

## 🏗️ Project Overview

A multi-page, multilingual construction project management website clone built with React, featuring a modern design inspired by buildathome.preview.emergentagent.com. The website offers information about cost-effective construction services in Spain with a focus on transparency and direct cost models.

## ✨ Key Features

### 🌍 Multi-Language Support
- **English** (EN)
- **Spanish** (Español / ES)
- **Arabic** (العربية / AR)
- RTL (Right-to-Left) support for Arabic
- Language switcher in navigation bar
- Persistent language preference (localStorage)

### 📱 Multi-Page Architecture
- **Home Page**: Hero section, journey options, projects showcase
- **About Us**: Company information, mission, values
- **Contact**: Contact form and information
- **Journey Pages** (4 paths):
  - Choose Your Neighbors (Community Building)
  - Legal Recovery (Distressed Assets)
  - Hospitality & Assets (Investment Properties)
  - Retirement Oasis (Senior Living)

### 🎨 Design Features
- Responsive design (Desktop, Tablet, Mobile)
- Modern UI with Shadcn components
- Smooth animations and transitions
- Color-coded journey paths:
  - Blue for Community Building
  - Orange for Legal Recovery
  - Green for Investment Properties
  - Purple for Senior Living
- Gold accent color (#d4a650) throughout
- Dark navy background (#0a1628)

### 🔧 Technical Features
- React 19 with React Router for navigation
- Context API for language management
- Tailwind CSS for styling
- Lucide React for icons
- Shadcn UI components
- Toast notifications
- Smooth scroll behavior
- SEO-friendly structure

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Navbar.jsx    # Navigation bar with language switcher
│   │   └── Footer.jsx    # Footer with links and contact info
│   ├── context/
│   │   └── LanguageContext.js  # Language management context
│   ├── i18n/
│   │   └── translations.js     # All translations (en, es, ar)
│   ├── pages/
│   │   ├── HomePage.jsx              # Main landing page
│   │   ├── AboutPage.jsx             # About us page
│   │   ├── ContactPage.jsx           # Contact page with form
│   │   ├── ChooseNeighborsPage.jsx   # Journey path 1
│   │   ├── LegalRecoveryPage.jsx     # Journey path 2
│   │   ├── HospitalityAssetsPage.jsx # Journey path 3
│   │   └── RetirementOasisPage.jsx   # Journey path 4
│   ├── App.js            # Main app with routing
│   ├── App.css           # Custom styles
│   └── index.css         # Tailwind + global styles
```

## 🎯 Key Changes from Original

1. **Logo**: White background added to logo icon for better visibility
2. **Navigation**: "Live Projects" changed to "Our Projects"
3. **Languages**: Added Arabic (AR) in addition to English and Spanish
4. **Multi-page**: Expanded from single page to full multi-page website

## 🚀 Features by Page

### Home Page
- Full-screen hero with construction background
- Three statistics cards (50% savings, Direct Cost, 100% Transparency)
- Four journey cards with color-coded overlays
- Projects showcase section
- Smooth scroll navigation

### Journey Pages
Each journey page includes:
- Hero section with colored gradient background
- Benefits section
- Features with checkmarks
- Image gallery
- Call-to-action section
- Consistent navigation and footer

### About Page
- Company mission and values
- Feature highlights
- Team expertise showcase
- Visual testimonials

### Contact Page
- Contact form with validation
- Company contact information
- Location information
- Success toast notification

## 🎨 Color Scheme

- **Primary Gold**: #d4a650 (buttons, headings, accents)
- **Dark Navy**: #0a1628 (header, dark sections)
- **Journey Colors**:
  - Blue: #1e40af to #1e3a8a (Community)
  - Orange: #c2410c to #9a3412 (Legal Recovery)
  - Green: #15803d to #166534 (Investment)
  - Purple: #7e22ce to #6b21a8 (Retirement)

## 🔧 Technologies Used

- React 19
- React Router DOM 7.5.1
- Tailwind CSS 3.4.17
- Shadcn UI Components
- Lucide React (Icons)
- Axios
- React Hook Form
- Zod (Validation)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly buttons and links

## 🌐 Navigation Structure

```
/ (Home)
├── /#journey (Journey Section)
├── /#projects (Projects Section)
├── /about (About Us)
├── /contact (Contact)
└── /journey/
    ├── choose-neighbors
    ├── legal-recovery
    ├── hospitality-assets
    └── senior-living
```

## 💾 Data Management

Currently using **frontend-only mock data**. All content is stored in:
- `translations.js` for multilingual content
- Component state for form handling
- localStorage for language preference

## 🎯 User Experience Features

- Smooth page transitions
- Hover effects on cards and buttons
- Loading states
- Form validation
- Success/error toast messages
- Persistent language selection
- Intuitive navigation
- Clear call-to-action buttons

## 📝 Notes

- All images are sourced from Unsplash
- No backend integration (frontend-only with mock data)
- Toast notifications simulate form submissions
- All navigation links are functional
- Language switching works across all pages
- RTL layout automatically applied for Arabic

## 🚧 Future Enhancements (Optional)

- Backend API integration for:
  - Contact form submissions
  - Project data management
  - User authentication
  - Content management system
- Database for storing:
  - Projects
  - User inquiries
  - Newsletter subscriptions
- Admin panel for content management
- Blog/News section
- Property search functionality
- Virtual tour integration

## 🎉 Conclusion

This is a fully functional, multilingual, multi-page website clone that matches the design and functionality of the original reference site while incorporating the requested modifications.
