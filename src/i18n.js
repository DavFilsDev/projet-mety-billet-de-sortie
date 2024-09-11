import React, { createContext, useState, useContext } from "react";

// Créer le contexte
const LangContext = createContext();

// Fournisseur de contexte pour permettre l'accès à la langue dans toute l'application
export function LangProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}

// Custom hook pour utiliser le contexte dans les composants
export function useLang() {
  return useContext(LangContext);
}
