import React, { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ChooseNeighborsPage from "./pages/ChooseNeighborsPage";
import LegalRecoveryPage from "./pages/LegalRecoveryPage";
import HospitalityAssetsPage from "./pages/HospitalityAssetsPage";
import RetirementOasisPage from "./pages/RetirementOasisPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { Toaster } from "./components/ui/toaster";

// Handle Google OAuth callback
function AuthCallback() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash;
    const match = hash.match(/session_id=([^&]+)/);
    if (match) {
      const sessionId = match[1];
      googleLogin(sessionId)
        .then(() => {
          navigate('/', { replace: true });
        })
        .catch(() => {
          navigate('/', { replace: true });
        });
    } else {
      navigate('/', { replace: true });
    }
  }, [googleLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#d4a650] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Signing in...</p>
      </div>
    </div>
  );
}

function AppRouter() {
  const location = useLocation();

  // Check for session_id synchronously during render
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/journey/choose-neighbors" element={<ChooseNeighborsPage />} />
        <Route path="/journey/legal-recovery" element={<LegalRecoveryPage />} />
        <Route path="/journey/hospitality-assets" element={<HospitalityAssetsPage />} />
        <Route path="/journey/senior-living" element={<RetirementOasisPage />} />
        <Route path="/project/37-villa-collection" element={<ProjectDetailsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
      <CookieBanner />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <AppRouter />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
