import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import "../styles/Gardien.css";
import { useTranslation } from "react-i18next";

const ListeEtudiantsSortis = ({ selectedMenu }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore
  const [students, setStudents] = useState([]); // State to hold student data
  const { t } = useTranslation(); // Hook pour les traductions

  // Fonction pour gérer le bouton de sortie
  const handleExitToggle = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isOut: !student.isOut } : student
      )
    );
  };

  // Fonction pour gérer le bouton de retour
  const handleEnterToggle = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, isIn: !student.isIn } : student
      )
    );
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirection vers la page d'accueil
      })
      .catch((error) => {
        console.error("Erreur de déconnexion : ", error);
      });
  };

  useEffect(() => {
    if (selectedMenu === "home") {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, "SortieNonConfirmé")
          );
          const studentList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStudents(studentList);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des étudiants : ",
            error
          );
        }
      };

      fetchData();
    }
  }, [selectedMenu]);

  let content;

  switch (selectedMenu) {
    case "home":
      content = (
        <div style={styles.bodyCon}>
          <h1 className="title">Listes des étudiants sortis</h1>
          <div style={styles.tableContainer}>
            <table style={styles.studentsTable}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Nom</th>
                  <th style={styles.th}>Raison</th>
                  <th style={styles.th}>Lieu de Sortie</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Vérification de sortie</th>
                  <th style={styles.th}>Vérification d'entrée</th>
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
                          backgroundColor: student.isOut
                            ? "green"
                            : "lightblue",
                          color: "white",
                          padding: "10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleExitToggle(student.id)}
                      >
                        {student.isOut ? "Efa nivoaka" : "Mbola tsy nivoaka"}
                      </button>
                    </td>
                    <td>
                      <button
                        style={{
                          backgroundColor: student.isIn ? "green" : "lightblue",
                          color: "white",
                          padding: "10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEnterToggle(student.id)}
                      >
                        {student.isIn ? "Efa niverina" : "Mbola tsy niverina"}
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

    case "settings":
      content = (
        <div style={styles.bodyCon}>
          <div style={styles.body1}>
            <h1 style={styles.titre}>
              Etudiant chez Passerelles Numériques Madagascar
            </h1>
            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom d'utilisateur :</label>
                <input type="text" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Téléphone :</label>
                <input type="text" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email :</label>
                <input type="email" style={styles.input} />
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.cancelButton}>Annuler</button>
                <button style={styles.saveButton}>Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case "notifications":
      content = (
        <div style={styles.bodyCon}>
          <div className="notification-box">
            <div className="header">
              <h2>Boîte de réception</h2>
              {/* <button className="close-button">&times;</button> */}
            </div>
            {/*                         <div className="menu">
                            <button className="menu-item active">Tout</button>
                            <button className="menu-item">Non lu</button>
                        </div> */}
            <div className="notifications">
              {[...Array(1)].map((_, index) => (
                <div key={index} className="notification">
                  <p>La liste des étudiants en retard hier sont:</p>
                  <ul>
                    <li>Anasta</li>
                    <li>Luicia</li>
                    <li>David</li>
                  </ul>
                  <p> La liste des étudiants en retard aujourd'huit sont:</p>
                  <ul>
                    <li>David</li>
                    <li>Mahery</li>
                  </ul>
                  <span className="time">Il y a 15 minutes</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      break;

    case "user":
      content = (
        <div style={styles.bodyCon}>
          <div style={styles.card}>
            <div style={styles.profileImageContainer}>
              <img src="" alt="Photo" style={styles.profileImg} />
            </div>
            <div style={styles.profileName}>Fano</div>
            <div style={styles.profileTitle}>
              Responsable de la vie des étudiants
            </div>
          </div>
        </div>
      );
      break;

    case "logout":
      content = (
        <div style={styles.bodyCon}>
          <div style={styles.container}>
            <div style={styles.content}>
              <div style={styles.card}>
                <img src="" alt="Admin" style={styles.profileImage} />
                <div style={styles.buttons}>
                  <button style={styles.logoutButton} onClick={handleLogout}>
                    Se déconnecter
                  </button>
                  <button style={styles.cancelbtn}>Annuler</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;

    default:
      content = <h1>Bienvenue</h1>;
  }

  return <div style={styles.body}>{content}</div>;
};
const styles = {
  body1: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "500px",
    width: "90vh", // S'adapte à la taille de l'écran
    textAlign: "center",
    "@media (max-width: 768px)": {
      padding: "20px",
    },
  },
  formGroup: {
    color: "#333",
    backgroundColor: "#FF9933",
  },

  bodyContent: {
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Occupe toute la hauteur de la fenêtre
    backgroundColor: "#f0f8ff",
    padding: "20px",
    marginLeft: "10px",
    width: "90vh",
  },

  container: {
    width: "100px",
    height: "100px",
  },
  bodyContent1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Occupe toute la hauteur de la fenêtre
    backgroundColor: "#f0f8ff",
    padding: "20px",
    marginLeft: "90px",
    width: "1400px",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    width: "100%",
  },

  bodyCon: {
    marginLeft: "10px",
    marginTop: "8px",
    width: "65%",
    height: "50vh",

    "@media (max-width: 768px)": {
      minWidth: "20%",
    },
    "@media (max-width: 348px)": {
      minWidth: "20%",
    },
  },
  titre: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    borderBottom: "2px solid #4facc4",
    paddingBottom: "10px",
    "@media (max-width: 768px)": {
      fontSize: "20px",
    },
  },
  tableContainer: {
    height: "500px", // Hauteur définie pour permettre le défilement
    overflowY: "auto",
    width: "1000px", // Activer le défilement vertical
  },
  studentsTable: {
    width: "100%",
    borderCollapse: "collapse", // Fusionner les bordures des cellules
  },
  thead: {
    position: "sticky",
    top: 0, // Fixer l'en-tête en haut du conteneur
    backgroundColor: "#FF9933", // Couleur de fond pour l'en-tête
    zIndex: 1, // Assurer que l'en-tête reste au-dessus du reste du contenu
  },
  th: {
    padding: "10px",
    border: "1px solid #ddd", // Bordure pour les cellules
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd", // Bordure pour les cellules
    textAlign: "left",
  },
  btn: {
    backgroundColor: "#FF9933",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "8px",
    padding: "12px 20px",
    width: "250px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    margin: "5px auto",
    transition: "background-color 0.3s ease",

    "@media (max-width: 768px)": {
      fontSize: "14px",
      padding: "10px 15px",
      width: "60%",
    },
    "@media (max-width: 480px)": {
      fontSize: "12px",
      padding: "8px 10px",
      width: "70%",
    },
    ":hover": {
      backgroundColor: "#FF7800",
    },
  },

  card: {
    width: "300px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    marginLeft: "5px",

    "@media (max-width: 768px)": {
      width: "150px",
      marginBottom: "20px",
    },
  },

  profileImageContainer: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",

    margin: "0 auto 10px auto",
    border: "2px solid #3FB9D7",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333333",
    margin: "10px 0 5px 0",
  },
  profileTitle: {
    fontSize: "14px",
    color: "#777777",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },

  label: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    "@media (max-width: 768px)": {
      padding: "8px",
      fontSize: "12px",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "10px",
    },
  },

  cancelButton: {
    backgroundColor: "#ff6666",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
    "@media (max-width: 768px)": {
      padding: "8px 16px",
      fontSize: "12px",
    },
    "&:hover": {
      backgroundColor: "#ff4c4c",
    },
  },
  saveButton: {
    backgroundColor: "#4facc4",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
    "@media (max-width: 768px)": {
      padding: "8px 16px",
      fontSize: "12px",
    },
    "&:hover": {
      backgroundColor: "#3b9bb2",
    },
  },

  notificationContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#2C2C2C",
    borderRadius: "10px",
    color: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #555555",
    paddingBottom: "10px",
    marginBottom: "10px",
    width: "1200px",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#FFFFFF",
    fontSize: "24px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  closeButtonHover: {
    color: "#FF9933",
  },
  notificationMenu: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    borderBottom: "1px solid #555555",
    paddingBottom: "10px",
  },

  menuItem: {
    background: "none",
    border: "none",
    color: "#AAAAAA",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    paddingBottom: "5px",
    transition: "color 0.3s ease, border-bottom 0.3s ease",
  },
  active: {
    color: "#FF9933",
    borderBottom: "2px solid #FF9933",
  },
  notificationList: {
    maxHeight: "250px",
    overflowY: "auto",
    scrollbarWidth: "thin",
  },
  notificationItem: {
    padding: "10px 0",
    borderBottom: "1px solid #555555",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationTime: {
    color: "#AAAAAA",
    fontSize: "14px",
  },

  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carde: {
    width: "450px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

    "@media (max-width: 768px)": {
      width: "250px",
      padding: "15px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",

    "@media (max-width: 768px)": {
      flexDirection: "column",
      marginTop: "10px",
    },
  },
  logoutButton: {
    backgroundColor: "#FF9933",
    color: "white",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",

    "@media (max-width: 768px)": {
      width: "50%",
    },
  },
  cancelbtn: {
    backgroundColor: "white",
    color: "#FF9933",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "8px",
    border: "2px solid #FF9933",
    cursor: "pointer",

    "@media (max-width: 768px)": {
      width: "50%",
    },
  },

  verificationButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  verificationButtonHover: {
    backgroundColor: "#45a049",
  },
};

export default ListeEtudiantsSortis;
