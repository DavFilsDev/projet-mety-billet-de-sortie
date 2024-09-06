import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';
import { collection, addDoc, doc, getDoc, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import '../styles/AjouterEtudiant.css'; // Vous pouvez utiliser le même fichier CSS ou en créer un nouveau pour AjouterGardien
import { NavLink } from 'react-router-dom';

function AjouterGardien() {
  const [nomGardien, setNomGardien] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [gardiens, setGardiens] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const idDocRef = doc(db, 'GardienTab', 'currentId');
      const idDoc = await getDoc(idDocRef);
      const currentId = idDoc.exists() ? idDoc.data().currentId + 1 : 1;

      // Ajoutez le nouveau gardien
      await addDoc(collection(db, 'GardienTab'), {
        currentId,
        email,
        nomGardien,
        tel,
      });

      // Mettez à jour le document `currentId` avec le nouvel identifiant
      await setDoc(idDocRef, { currentId });

      // Réinitialisez le formulaire
      setNomGardien('');
      setEmail('');
      setTel('');

      alert('Gardien ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du gardien :', error);
      alert('Erreur lors de l\'ajout du gardien.');
    }
  };

  useEffect(() => {
    // Observer les changements dans la collection GardienTab
    const q = query(collection(db, 'GardienTab'), orderBy('currentId', 'asc'));
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
                <button className="back-btn1">Retour</button>
     </NavLink>
    <div className="form-container">
      {showForm ? (
        <>
          <h2>Ajouter un gardien</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom d'utilisateur :</label>
              <input
                type="text"
                value={nomGardien}
                onChange={(e) => setNomGardien(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Adresse Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Téléphone :</label>
              <input
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </>
      ) : (
        <>
          <button onClick={toggleForm}>Ajouter gardien</button>
          <div className="students-table-container">
            <h2>Liste des gardiens</h2>
            <table className="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Nom</th>
                </tr>
              </thead>
              <tbody>
                {gardiens.map((gardien) => (
                  <tr key={gardien.id}>
                    <td>{gardien.currentId}</td>
                    <td>{gardien.email}</td>
                    <td>{gardien.tel}</td>
                    <td>{gardien.nomGardien}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <button onClick={toggleForm}>{showForm ? 'Afficher les gardiens' : 'Ajouter gardien'}</button>
    </div>
    </>
  );
}

export default AjouterGardien;
