import React from "react";
import "../styles/HistoriqueStudent.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HistoriqueDemandes = () => {
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <>
      <NavLink to="/Connections/StudentHome">
        <button className="back-btn1">Retour</button>
      </NavLink>
      <div className="historique-container">
        <h1 className="title">Historiques des demandes</h1>
        <div className="search-container">
          <label htmlFor="search-date">Recherche date spécifique :</label>
          <input type="text" id="jour" placeholder="jour" />
          <input type="text" id="mois" placeholder="mois" />
          <input type="text" id="annee" placeholder="année" />
          <button className="validate-button">Valider</button>
        </div>
        <div className="tabs">
          <button className="tab active">Tout</button>
          <button className="tab">Aujourd'hui</button>
          <button className="tab">Cette semaine</button>
          <button className="tab">Cette mois</button>

        </div>
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Destinateur</th>
              <th>Raison</th>
              <th>Etat</th>
            </tr>
          </thead>
          <tbody>
            {/* Ici, vous pouvez mapper les données de votre historique */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Ajouter d'autres lignes ici */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoriqueDemandes;
