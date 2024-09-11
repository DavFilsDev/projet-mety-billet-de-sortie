import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/HomePage.css"; // Importation du fichier CSS
import image1 from "../assets/Images/imageAccueil1.jpg";
import image2 from "../assets/Images/imageAccueil2.jpg";
import image3 from "../assets/Images/imageAccueil3.jpg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLang } from "../i18n"; // Import du hook useLang

const translations = {
  en: { welcomeMessage: "Welcome to the home page" },
  fr: { welcomeMessage: "Bienvenue sur la page d'accueil" },
  mg: { welcomeMessage: "Tonga soa eto amin'ny pejy fandraisana" },
};
const HomePage = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  const { language } = useLang(); // Utiliser le contexte de langue

  return (
    <>
      <Header />
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">Billet de sortie</h2>
            <p className="hero-description">
              Pour faciliter votre demande de sortie, Billet de Sortie est faite
              pour vous.
            </p>
            <NavLink to="/Apropos" className="learn-more-button">
              En savoir plus
            </NavLink>
          </div>
          <div className="hero-image">
            <div className="slider">
              <img src={image1} alt="Slide 1" />
              <img src={image2} alt="Slide 2" />
              <img src={image3} alt="Slide 3" />
            </div>
          </div>
        </section>
        <section className="info-section">
          <div className="connect-section">
            <h3 className="section-title">Se connecter:</h3>
            <div className="role-options">
              <div className="role-option">
                <input type="radio" id="admin" name="role" value="admin" />
                <label htmlFor="admin">Administrateur</label>
              </div>
              <div className="role-option">
                <input type="radio" id="guard" name="role" value="guard" />
                <label htmlFor="guard">Gardien</label>
              </div>
              <div className="role-option">
                <input type="radio" id="student" name="role" value="student" />
                <label htmlFor="student">Étudiant</label>
              </div>
            </div>
            <NavLink to="/Connections" className="login-button">
              <a href="/login" className="login-button">
                <button className="google-login-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                  Se connecter avec Google
                </button>
              </a>
            </NavLink>
          </div>
          <div className="about-section1">
            <h3 className="section-title">A propos</h3>
            <ul className="about-list">
              <li>
                Gère et suit les sorties des étudiants du campus de Passerelles
                Numériques Madagascar.
              </li>
              <li>
                Permet de donner les billets de sortie des étudiants du campus
                de Passerelles Numériques Madagascar.
              </li>
              <li>Une application simple et sécurisée.</li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
