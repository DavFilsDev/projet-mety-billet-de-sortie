import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../styles/SupprimerEtudiant.css';
import { NavLink } from 'react-router-dom';

function SupprimerEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchEtudiants = async () => {
      const querySnapshot = await getDocs(collection(db, 'EtudiantTab'));
      const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEtudiants(students.sort((a, b) => a.Identifiant - b.Identifiant));
    };

    fetchEtudiants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'EtudiantTab', id));
      setEtudiants(etudiants.filter(student => student.id !== id));
      setShowConfirm(false);
      alert('Étudiant supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
      alert('Erreur lors de la suppression de l\'étudiant.');
    }
  };

  return (
    <>
      <NavLink to="/Connections/AdminHome">
        <button className="back-btn5">Retour</button>
      </NavLink>
      <div className="container">
        <h2>Liste des étudiants</h2>
        {etudiants.length === 0 ? (
          <p>Aucun étudiant trouvé.</p>
        ) : (
          // Envelopper le tableau dans un div pour le scroll horizontal
          <div className="table-wrapper">
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
                {etudiants.map(student => (
                  <tr key={student.id}>
                    {/* Ajouter des data-label pour les écrans mobiles */}
                    <td data-label="Identifiant">{student.identifiant}</td>
                    <td data-label="Email">{student.email}</td>
                    <td data-label="Téléphone">{student.tel}</td>
                    <td data-label="Nom">{student.nomEleve}</td>
                    <td data-label="Actions">
                      <button
                        className="delete-button"
                        onClick={() => {
                          setStudentToDelete(student.id);
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
          </div>
        )}
        {showConfirm && (
          <div className="confirm-dialog">
            <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
            <button
              className="confirm-button"
              onClick={() => handleDelete(studentToDelete)}
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

export default SupprimerEtudiant;
