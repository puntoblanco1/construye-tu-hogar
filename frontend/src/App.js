import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ChooseNeighborsPage from "./pages/ChooseNeighborsPage";
import LegalRecoveryPage from "./pages/LegalRecoveryPage";
import HospitalityAssetsPage from "./pages/HospitalityAssetsPage";
import RetirementOasisPage from "./pages/RetirementOasisPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="App">
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
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
