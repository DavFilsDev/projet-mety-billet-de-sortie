import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HistoriqueSortie() {
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn">Retour</button>
      </NavLink>
      <div>
        <h2>Voici la liste des étudiants sorties</h2>
      </div>
    </>
  );
}
