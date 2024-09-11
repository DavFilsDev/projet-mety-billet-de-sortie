import React, { useState } from "react";
import { useLang } from "../i18n"; // Import du hook useLang

const translations = {
  en: { welcome: "Welcome", changeLang: "Change Language" },
  fr: { welcome: "Bienvenue", changeLang: "Changer de Langue" },
  mg: { welcome: "Tonga soa", changeLang: "Hanova Fiteny" },
};

function LanguageSelector() {
  const { language, changeLanguage } = useLang(); // Utiliser le contexte de langue
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{translations[language].welcome}</h1>
      <button onClick={() => setShowOptions(!showOptions)}>
        {translations[language].changeLang}
      </button>
      {showOptions && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("fr")}>Français</button>
          <button onClick={() => changeLanguage("mg")}>Malagasy</button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
