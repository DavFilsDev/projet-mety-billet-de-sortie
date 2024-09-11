import React, { useState } from "react";
import "../styles/ModifierHeureSortie.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ModifierHeureSortie = () => {
  const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const [buttonStates, setButtonStates] = useState(
    Array(jours.length).fill("Modifier")
  );
  const [noSortieStates, setNoSortieStates] = useState(
    Array(jours.length).fill(false)
  ); // Nouvel état
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleInputChange = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = "Valider";
    setButtonStates(newButtonStates);
  };

  const handleButtonClick = (jour, index) => {
    if (buttonStates[index] === "Valider") {
      alert(`Les heures de sortie pour ${jour} ont été validées!`);
      const newButtonStates = [...buttonStates];
      newButtonStates[index] = "Modifier";
      setButtonStates(newButtonStates);
    } else {
      alert(`Le bouton Modifier pour ${jour} a été cliqué!`);
    }
  };

  const handleNoSortieClick = (index) => {
    const newNoSortieStates = [...noSortieStates];
    newNoSortieStates[index] = !newNoSortieStates[index]; // Bascule l'état entre true et false
    setNoSortieStates(newNoSortieStates);
  };

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn1">Retour</button>
      </NavLink>
      <div className="modifier-heure-container">
        <h2 className="title">Modifier l’heure des sorties</h2>
        {jours.map((jour, index) => (
          <div key={index} className="jour-container">
            <span className="jour-name">{jour}</span>
            <input
              type="text"
              placeholder="jj/mm/aaaa"
              className="date-input"
              onChange={() => handleInputChange(index)}
            />
            <span>de</span>
            <input
              type="time"
              className="time-input"
              onChange={() => handleInputChange(index)}
            />
            <span>à</span>
            <input
              type="time"
              className="time-input"
              onChange={() => handleInputChange(index)}
            />
            <button
              className={`action-button ${
                buttonStates[index] === "Valider"
                  ? "valider-button"
                  : "modifier-button"
              }`}
              onClick={() => handleButtonClick(jour, index)}
            >
              {buttonStates[index]}
            </button>
            <button
              className={`no-sortie-button ${
                noSortieStates[index] ? "sortie-libre-button" : ""
              }`}
              onClick={() => handleNoSortieClick(index)}
            >
              {noSortieStates[index] ? "Sortie libre" : "Pas de sortie"}
            </button>
          </div>
        ))}
      </div>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn1">Retour</button>
      </NavLink>

    </>
  );
};

export default ModifierHeureSortie;
