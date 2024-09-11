import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "../styles/AjouterEtudiant.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AjouterGardien() {
  const [identifiant, setIdentifiant] = useState(""); // Nouveau champ pour l'identifiant
  const [nomGardien, setNomGardien] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [gardiens, setGardiens] = useState([]);
  const { t } = useTranslation(); // Hook pour les traductions

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajoutez le nouveau gardien
      await addDoc(collection(db, "GardienTab"), {
        identifiant, // Sauvegarde de l'identifiant saisi manuellement
        email,
        nomGardien,
        tel,
      });

      // Réinitialisez le formulaire
      setIdentifiant(""); // Réinitialiser le champ identifiant
      setNomGardien("");
      setEmail("");
      setTel("");

      alert("Gardien ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du gardien :", error);
      alert("Erreur lors de l'ajout du gardien.");
    }
  };

  useEffect(() => {
    // Observer les changements dans la collection GardienTab
    const q = query(
      collection(db, "GardienTab"),
      orderBy("identifiant", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gardiensList = [];
      querySnapshot.forEach((doc) => {
        gardiensList.push({ ...doc.data(), id: doc.id });
      });
      setGardiens(gardiensList);
    });
    return () => unsubscribe();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn5">Retour</button>
      </NavLink>

    
        {showForm ? (
          <>
            <div className="form-container">
            <h2>Ajouter un gardien</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group1">
                <label>Identifiant :</label> {/* Nouveau champ Identifiant */}
                <input
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label>Nom d'utilisateur :</label>
                <input
                  type="text"
                  value={nomGardien}
                  onChange={(e) => setNomGardien(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label>Adresse Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label>Téléphone :</label>
                <input
                  type="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <button className='subm' type="submit">Ajouter</button>
            </form>
            </div>
          </>
        ) : (
          <>
           <div className="form-container1">
            <button onClick={toggleForm}>Ajouter gardien</button>
            <div className="studen-table-container1">
              <h2>Liste des gardiens</h2>
              <table className="studen-table">
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {gardiens.map((gardien) => (
                    <tr key={gardien.id}>
                      <td>{gardien.identifiant}</td>{" "}
                      {/* Affichage de l'identifiant */}
                      <td>{gardien.email}</td>
                      <td>{gardien.tel}</td>
                      <td>{gardien.nomGardien}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </>
        )}

        <button onClick={toggleForm}>
          {showForm ? "Afficher les gardiens" : "Ajouter gardien"}
        </button>
      </div>

    </>
  );
}

export default AjouterGardien;
