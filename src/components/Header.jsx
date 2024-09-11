import React, { useState } from "react";
import "../styles/Hearder.css";
import { NavLink } from "react-router-dom";
import Mylogo from "../assets/Images/Logo.png"; // Importation du logo
import LanguageSwitcher from "./LanguageSwitcher"; // Assure-toi que le chemin est correct

const Header = () => {
  const [language, setLanguage] = useState("fr"); // Langue par défaut : Français

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Ajouter la logique pour changer la langue ici
    console.log("Langue choisie :", e.target.value);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Mylogo} alt="Billet de Sortie" />
      </div>
      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <NavLink
              to="/"
              className="header__link"
              activeClassName="header__link--active"
            >
              Accueil
            </NavLink>
          </li>
          <li className="header__menu-item">
            <NavLink
              to="/Apropos"
              className="header__link"
              activeClassName="header__link--active"
            >
              A propos
            </NavLink>
          </li>
          <li className="header__menu-item">
            <NavLink to="/Connections" className="header__button">
              Se connecter
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bouton de changement de langue */}
      <LanguageSwitcher />
    </header>
  );
};
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  title: {
    fontSize: "1.5rem",
  },
  languageSelector: {
    display: "flex",
    alignItems: "center",
  },
};

export default Header;
