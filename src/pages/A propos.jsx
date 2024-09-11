import React from "react";
import "../styles/A propos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import myApropos from "../assets/Images/Apropos.png";
import myApropos1 from "../assets/Images/Apropos1.png";
import myApropos2 from "../assets/Images/Apropos2.png";
import { useTranslation } from "react-i18next";

const Apropos = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  return (
    <div className="about-page">
      <Header />
      <section className="about-section">
        <h1>A PROPOS</h1>

        <div className="about-item">
          <img src={myApropos} alt="Billet de Sortie" />
          <div className="text">
            <h2>Billet de Sortie</h2>
            <p>
              "Billet de Sortie" est une application innovante conçue pour
              simplifier la gestion des sorties des jeunes sur le campus. Elle
              permet aux étudiants de gérer efficacement leurs sorties en
              enregistrant des informations telles que l'heure de départ, la
              raison de la sortie, et l'heure de retour. Grâce à un système de
              suivi intégré, elle aide également les administrateurs à garder un
              œil sur les retours pour assurer la sécurité et la transparence.
            </p>
          </div>
        </div>

        <div className="about-item milieu">
          <img src={myApropos1} alt="Notre Mission" />
          <div className="text">
            <h2>Notre Mission</h2>
            <p>
              Nous visons à créer un environnement sécurisé et organisé pour les
              étudiants et les administrations. En offrant une plateforme facile
              à utiliser, nous facilitons le suivi des allées et venues sur le
              campus, tout en respectant la confidentialité et la sécurité des
              données de chaque utilisateur.
            </p>
          </div>
        </div>

        <div className="about-item features">
          <img src={myApropos2} alt="Fonctionnalités Clés" className="img1" />
          <div className="text">
            <h2>Fonctionnalités Clés</h2>
            <ul>
              <li>
                <strong>Enregistrement Simplifié des Sorties :</strong> Les
                étudiants peuvent rapidement saisir leurs heures de départ et de
                retour, choisir une raison parmi une liste prédéfinie ou entrer
                une raison personnalisée.
              </li>
              <li>
                <strong>Suivi des Retours :</strong> Avec des rappels et des
                notifications, "Billet de Sortie" assure que les retours sont
                correctement enregistrés, aidant ainsi à maintenir un suivi
                complet et précis.
              </li>
              <li>
                <strong>Authentification Sécurisée :</strong> Une connexion
                sécurisée via un identifiant unique garantit que seules les
                personnes autorisées peuvent accéder aux informations.
              </li>
              <li>
                <strong>Historique des Sorties :</strong> Les utilisateurs ont
                accès à un historique complet de leurs sorties, ce qui permet de
                garder une trace des mouvements pour une meilleure gestion
                personnelle.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Apropos;
