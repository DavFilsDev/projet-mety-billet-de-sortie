import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Connections from "./pages/Connections";
import AdminHome from "./pages/AdminHome";
import StudentHome from "./pages/StudentHome";
import GardeHome from "./pages/GardeHome";
import AjouterEtudiant from "./components/AjouterEtudiant";
import SupprimerEtudiant from "./components/SupprimerEtudiant";
import AjouterGardien from "./components/AjouterGardien";
import SupprimerGardien from "./components/SupprimerGardien";
import EnvoyerBilletDeSortie from "./components/EnvoyerBilletDeSortie";
import HistoriqueSortie from "./components/HistoriqueSortie";
import ModifierHeureSortie from "./components/ModifierHeureSortie";
import Apropos from "./pages/A propos";
import SortieBille from "./components/SortieBille";
import PrivacyPolicy from "./pages/privacy-policy";
import Fonctionnement from "./pages/Fonctionnement";
import React from "react";
import "./i18n"; // Importer la configuration i18n
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { LangProvider } from "./i18n"; // Import du LangProvider

function App() {
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <div className="App">
      <LangProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Connections" element={<Connections />} />
            <Route path="/Apropos" element={<Apropos />} />
            <Route path="/Connections/AdminHome" element={<AdminHome />} />
            <Route path="/Connections/StudentHome" element={<StudentHome />} />
            <Route path="/Connections/GardeHome" element={<GardeHome />} />
            <Route
              path="/Connections/AdminHome/AjouterEtudiant"
              element={<AjouterEtudiant />}
            />
            <Route
              path="/Connections/AdminHome/SupprimerEtudiant"
              element={<SupprimerEtudiant />}
            />
            <Route
              path="/Connections/AdminHome/AjouterGardien"
              element={<AjouterGardien />}
            />
            <Route
              path="/Connections/AdminHome/SupprimerGardien"
              element={<SupprimerGardien />}
            />
            <Route
              path="/Connections/AdminHome/EnvoyerBilletSortie"
              element={<EnvoyerBilletDeSortie />}
            />
            <Route
              path="/Connections/AdminHome/HistoriqueSortie"
              element={<HistoriqueSortie />}
            />
            <Route
              path="/Connections/AdminHome/ModifierHeureSortie"
              element={<ModifierHeureSortie />}
            />
            <Route
              path="/student-home/MainEtudiant/SortieBille"
              element={<SortieBille />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/Fonctionnement" element={<Fonctionnement />} />
            <Route path="/languagesswitcher" element={<LanguageSwitcher />} />
          </Routes>
        </Router>
      </LangProvider>
    </div>
  );
}

export default App;
