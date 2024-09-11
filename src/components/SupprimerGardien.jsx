import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../styles/SupprimerEtudiant.css"; // Vous pouvez créer ou réutiliser ce fichier CSS
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SupprimerGardien() {
  const [gardiens, setGardiens] = useState([]);
  const [gardienToDelete, setGardienToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  useEffect(() => {
    const fetchGardiens = async () => {
      const querySnapshot = await getDocs(collection(db, "GardienTab"));
      const gardiensList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGardiens(gardiensList.sort((a, b) => a.Identifiant - b.Identifiant));
    };

    fetchGardiens();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "GardienTab", id));
      setGardiens(gardiens.filter((gardien) => gardien.id !== id));
      setShowConfirm(false);
      alert("Gardien supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du gardien :", error);
      alert("Erreur lors de la suppression du gardien.");
    }
  };

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn">Retour</button>
      </NavLink>
      <div className="form-container">
        <h2>Liste des gardiens</h2>
        {gardiens.length === 0 ? (
          <p>Aucun gardien trouvé.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gardiens.map((gardien) => (
                <tr key={gardien.id}>
                  <td>{gardien.identifiant}</td>
                  <td>{gardien.email}</td>
                  <td>{gardien.tel}</td>
                  <td>{gardien.nomGardien}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => {
                        setGardienToDelete(gardien.id);
                        setShowConfirm(true);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showConfirm && (
          <div className="confirm-dialog">
            <p>Êtes-vous sûr de vouloir supprimer ce gardien ?</p>
            <button
              className="confirm-button"
              onClick={() => handleDelete(gardienToDelete)}
            >
              Valider
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirm(false)}
            >
              Annuler
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SupprimerGardien;
