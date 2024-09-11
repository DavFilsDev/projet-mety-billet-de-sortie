import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Fonctionnement.css";
import MyAdminfonc from "../assets/Images/Adminfonc.png";
import Myfonc from "../assets/Images/Fonct.png";
import EtudiantFonc from "../assets/Images/Etudiantfonc.png";
import { useTranslation } from "react-i18next";

const FonctionnaliteApplicationV2 = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  return (
    <>
      <Header />
      <div className="container">
        <section className="intro">
          <h1>Fonctionnalité de l'application</h1>
          <img src={Myfonc} alt="Fonctionnalité de l'application" />
          <img src={MyAdminfonc} alt="Fonctionnalité de l'application" />
          <img src={EtudiantFonc} alt="Fonctionnalité de l'application" />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FonctionnaliteApplicationV2;
