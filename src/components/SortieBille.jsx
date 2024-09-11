import React, { useState } from "react";
import { db } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "../styles/SortieBille.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SortieBille = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [lieu, setLieu] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false); // Nouvel état pour le chargement
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== "other") {
      setOtherReason("");
    }
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le chargement
    try {
      // Stocker les données dans Firestore
      await addDoc(collection(db, "SortieNonConfirmé"), {
        Nom: name,
        Lieu: lieu,
        Date: date,
        Raison: reason === "other" ? otherReason : reason,
      });
      alert("Billet de sortie envoyé avec succès !");
      // Réinitialiser le formulaire
      setName("");
      setLieu("");
      setDate("");
      setReason("");
      setOtherReason("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du billet de sortie :", error);
      alert("Erreur lors de l'envoi du billet de sortie.");
    } finally {
      setLoading(false); // Cacher le chargement
    }
  };


  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 id="valisoa">Envoyer billet de sortie</h1>
        <form className="send-ticket-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lieu">Lieu de sortie</label>
            <input
              type="text"
              id="lieu"
              name="lieu"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <div className="date-input-container">
              <input
                type="date"
                name="departureDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="reason">La raison de la sortie :</label>
            <select
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              required
            >
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
                name="otherReason"
                value={otherReason}
                onChange={handleOtherReasonChange}
              />
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      <NavLink to="/Connections/StudentHome">
        <button className="back-btn">Retour</button>
      </NavLink>
    </div>
  );
};

export default SortieBille;
