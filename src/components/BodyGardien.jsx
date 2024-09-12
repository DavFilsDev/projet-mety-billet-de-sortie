import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import '../styles/Gardien.css';
import '../styles/BodyGardien.css';



const ListeEtudiantsSortis = ({ selectedMenu }) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore(); // Initialize Firestore
    const [students, setStudents] = useState([]); // State to hold student data

    // Fonction pour gérer le bouton de sortie
    const handleExitToggle = async (id) => {
        try {
            const student = students.find(student => student.id === id);
            if (student) {
                const heureSortie = new Date(); // Obtenir l'heure actuelle

                // Ajouter ou mettre à jour le document dans la collection "SortieConfirmé"
                await addDoc(collection(db, 'SortieConfirmé'), {
                    ...student, // Inclure tous les champs existants de SortieNonConfirmé
                    heureSortie: Timestamp.fromDate(heureSortie),
                    status: 'confirmé',
                    userId: id
                });

                // Supprimer le document de la collection "SortieNonConfirmé"
                await updateDoc(doc(db, 'SortieNonConfirmé', id), {
                    isOut: true
                });

                // Mettre à jour l'état local pour refléter la confirmation de sortie
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === id ? { ...student, isOut: true } : student
                    )
                );
            }
        } catch (error) {
            console.error("Erreur lors de la confirmation de la sortie : ", error);
        }
    };

    // Fonction pour gérer le bouton de retour
    const handleEnterToggle = async (id) => {
        try {
            const student = students.find(student => student.id === id);
            if (student) {
                const heureRetour = new Date(); // Obtenir l'heure actuelle

                // Mettre à jour le document existant dans "SortieConfirmé" avec l'heure de retour
                const querySnapshot = await getDocs(collection(db, 'SortieConfirmé'));
                const docToUpdate = querySnapshot.docs.find(doc => doc.data().userId === id);
                if (docToUpdate) {
                    await updateDoc(doc(db, 'SortieConfirmé', docToUpdate.id), {
                        heureRetour: Timestamp.fromDate(heureRetour),
                        status: 'retour confirmé'
                    });
                }

                // Mettre à jour l'état local pour refléter la confirmation de retour
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === id ? { ...student, isIn: true } : student
                    )
                );
            }
        } catch (error) {
            console.error("Erreur lors de la confirmation du retour : ", error);
        }
    };

    // Fonction pour gérer la suppression du document
    const handleDelete = async (id) => {
        try {
            // Attendre 2 secondes avant de supprimer le document
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Supprimer le document de la collection "SortieNonConfirmé"
            await deleteDoc(doc(db, 'SortieNonConfirmé', id));

            // Rafraîchir la liste des étudiants
            const updatedStudents = students.filter(student => student.id !== id);
            setStudents(updatedStudents);
        } catch (error) {
            console.error("Erreur lors de la suppression du document : ", error);
        }
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/');  // Redirection vers la page d'accueil
        }).catch((error) => {
            console.error("Erreur de déconnexion : ", error);
        });
    };

    useEffect(() => {
        if (selectedMenu === 'home') {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'SortieNonConfirmé'));
                    const studentList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setStudents(studentList);
                } catch (error) {
                    console.error("Erreur lors de la récupération des étudiants : ", error);
                }
            };

            fetchData();
        }
    }, [selectedMenu]);


    let content;

    switch (selectedMenu) {
        case 'home':
            content = (
                <div className='bodyCon1'>
                <h1 className="titre2">Listes des étudiants sortis</h1>
                <div className='tableContainer'>
                    <table className='studentsTable'>
                        <thead className='thead'>
                            <tr>
                                <th className='th'>Nom</th>
                                <th className='th'>Raison</th>
                                <th className='th'>Lieu de Sortie</th>
                                <th className='th'>Date</th>
                                <th className='th'>Vérification de sortie</th>
                                <th className='th'>Vérification d'entrée</th>
                                <th className='th'>Suppression</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.Nom}</td>
                                    <td>{student.Raison}</td>
                                    <td>{student.Lieu}</td>
                                    <td>{student.Date}</td>
                                    <td>
                                        <button
                                            style={{
                                                backgroundColor: student.isOut ? 'green' : 'lightblue',
                                                color: 'white',
                                                padding: '10px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: 'small',
                                                '@media only screen and (max-width: 360px)': {
                                                fontSize: 'small',
                                                width: '40%',

                                            }
                                            }}
                                            onClick={() => handleExitToggle(student.id)}
                                        >
                                            {student.isOut ? "Efa nivoaka" : "Mbola tsy nivoaka"}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{
                                                backgroundColor: student.isIn ? 'green' : 'lightblue',
                                                color: 'white',
                                                padding: '10px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize:'small',
                                                '@media only screen and (max-width: 360px)': {
                                                fontSize: 'small',
                                                width: '40%',
                                            }
                                            }}
                                            onClick={() => handleEnterToggle(student.id)}
                                        >
                                            {student.isIn ? "Efa niverina" : "Mbola tsy niverina"}
                                        </button>
                                    </td>
                                    <td>
                                    <button
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: 'small',
                                            '@media only screen and (max-width: 360px)': {
                                                fontSize: 'small',
                                                width: '40%',
                                            }
                                        }}
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            );
            break;

       case 'settings':
            content = (
                <div className='bodyCo'>
                    <div className='body1'>
                        <h1 className='titre1'>Etudiant chez Passerelles Numériques Madagascar</h1>
                        <div className='form1'>
                            <div className='formGroup1'>
                                <label className='label'>Nom d'utilisateur :</label>
                                <input type="text" className='input1'/>
                            </div>
                            <div className='formGroup1'>
                                <label className='label'>Téléphone :</label>
                                <input type="text" className='input1' />
                            </div>
                            <div className='formGroup1'>
                                <label className='label'>Email :</label>
                                <input type="email" className='input1' />
                            </div>
                            <div className='buttonGroup'>
                                <button className='cancelButton'>Annuler</button>
                                <button className='saveButton'>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
            break;
            case 'notifications': 
            content = (
                <div className='bodyContient'>
                    <h2>Pas de notification reçu pour l'instant</h2>
                    
                </div>
            );
            break;


            case 'user':
                content = (
                    <div className='bodyCont1'>
                        
                        <div className='carde2'>
                            <div className='profileImageContainer'>
                                <img src="https://media.licdn.com/dms/image/v2/D4E03AQEMcBLjN5X_RQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720458087292?e=1731542400&v=beta&t=BwogQqVejfaUQ-hkGCJ_xx5wQvUzUYILhH-1U0tU8AM"  alt="Photo" className='profileImg'/>
                            </div>
                            <div className='profileName'>Valisoa</div>
                            <div className='profileTitle'>Securité de la vie internat</div>
                        </div>
                    </div>
                );
                break;
        case 'logout':
            content = (
                    <div className='content'>
                        <div className='carde'>
                            <img src="https://media.licdn.com/dms/image/v2/D4E03AQEMcBLjN5X_RQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720458087292?e=1731542400&v=beta&t=BwogQqVejfaUQ-hkGCJ_xx5wQvUzUYILhH-1U0tU8AM" alt="Admin" className='profileImg2' />
                            <div className='buttons'>
                            <button onClick={handleLogout} className='logoutButton'>Se déconnecter</button>
                                <button className='cancelbtn'>Annuler</button>
                            </div>
                        </div>
                    </div>
        );
            break;

        default:
            content = <h1>Bienvenue</h1>;
    }

    return <div className='body'>{content}</div>;
};

export default ListeEtudiantsSortis;
