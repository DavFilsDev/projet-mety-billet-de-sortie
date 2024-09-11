import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeureSortie() {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn">Retour</button>
      </NavLink>
      <div>
        <h2>Voici les heures de sortie disponible :</h2>
      </div>
    </>
  );
}
