import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/AjouterEtudiant.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AjouterEtudiant() {
  const [identifiant, setIdentifiant] = useState("");
  const [nomEleve, setNomEleve] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [students, setStudents] = useState([]);
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajoutez le nouvel étudiant avec l'Identifiant manuel
      await addDoc(collection(db, "EtudiantTab"), {
        identifiant, // Stocke l'identifiant manuellement saisi
        email,
        nomEleve,
        tel,
      });

      // Réinitialisez le formulaire
      setIdentifiant("");
      setNomEleve("");
      setEmail("");
      setTel("");

      alert("Étudiant ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
      alert("Erreur lors de l'ajout de l'étudiant.");
    }
  };

  useEffect(() => {
    // Observer les changements dans la collection EtudiantTab
    const q = query(
      collection(db, "EtudiantTab"),
      orderBy("identifiant", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsList = [];
      querySnapshot.forEach((doc) => {
        studentsList.push({ ...doc.data(), id: doc.id });
      });
      setStudents(studentsList);
    });
    return () => unsubscribe();
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn1">Retour</button>
      </NavLink>

      <div className="form-container">
        {showForm ? (
          <>
            <h2>Ajouter un étudiant</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Identifiant :</label>
                <input
                  type="text"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom d'utilisateur :</label>
                <input
                  type="text"
                  value={nomEleve}
                  onChange={(e) => setNomEleve(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone :</label>
                <input
                  type="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Ajouter</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={toggleForm}>Ajouter étudiant</button>
            <div className="students-table-container">
              <h2>Liste des étudiants</h2>
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Identifiant</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.identifiant}</td>
                      <td>{student.email}</td>
                      <td>{student.tel}</td>
                      <td>{student.nomEleve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <button onClick={toggleForm}>
          {showForm ? "Afficher les élèves" : "Ajouter étudiant"}
        </button>
      </div>
    </>
  );
}

export default AjouterEtudiant;
