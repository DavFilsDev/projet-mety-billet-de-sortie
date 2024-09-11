import React, { useState } from "react";
import "../styles/EnvoyerBilletDeSortie.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EnvoyerBilletDeSortie() {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const { t } = useTranslation(); // Hook pour les traductions

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== "other") {
      setOtherReason("");
    }
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sortieData = {
      reason: reason === "other" ? otherReason : reason,
      // Ajouter les autres champs ici (lieu, date, heure, etc.)
    };
    console.log("Billet de sortie envoyé :", sortieData);
  };

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-Valisoa">Retour</button>
      </NavLink>
      <div className="form-container">
        <h2>Envoyer billet de sortie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>A</label>
            <input type="text" placeholder="Nom de l'élève" />
          </div>

          <div className="form-group">
            <label>Date</label>
            <div className="date-group">
              <input type="text" placeholder="Départ" />
              <input type="text" placeholder="Retour" />
            </div>
          </div>

          <div className="form-group">
            <label>Heure</label>
            <div className="time-group">
              <input type="text" placeholder="Départ" />
              <input type="text" placeholder="Retour" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reason">La raison de la sortie :</label>
            <select id="reason" value={reason} onChange={handleReasonChange}>
              <option value="family">Visite de famille</option>
              <option value="medical">Rendez-vous médical</option>
              <option value="shopping">Courses</option>
              <option value="other">Autres</option>
            </select>
          </div>

          {reason === "other" && (
            <div className="form-group">
              <label htmlFor="otherReason">Veuillez préciser :</label>
              <input
                type="text"
                id="otherReason"
                value={otherReason}
                onChange={handleOtherReasonChange}
              />
            </div>
          )}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
}

export default EnvoyerBilletDeSortie;
