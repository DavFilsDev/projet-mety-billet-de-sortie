import React from "react";
import PhotoAdmin from "../assets/Images/adminPhoto.png";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useTranslation } from "react-i18next";

function AdminBody({ selectedMenu }) {
  const { t } = useTranslation(); // Hook pour utiliser les traductions
  const navigate = useNavigate();
  let content;

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Rediriger vers la page principale après déconnexion
    } catch (err) {
      console.log(err);
    }
  };

  switch (selectedMenu) {
    case "home":
      content = (
        <div style={styles.bodyContent1}>
          <div style={styles.body2}>
            <h1 style={styles.titre}>Responsable de la vie internat</h1>
            <NavLink to="/Connections/AdminHome/AjouterEtudiant">
              <h2 style={styles.btn}>Ajouter un étudiant</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/SupprimerEtudiant">
              <h2 style={styles.btn}>Supprimer un étudiant</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/AjouterGardien">
              <h2 style={styles.btn}>Ajouter un gardien</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/SupprimerGardien">
              <h2 style={styles.btn}>Supprimer un gardien</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/EnvoyerBilletSortie">
              <h2 style={styles.btn}>Envoyer un billet de sortie</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/HistoriqueSortie">
              <h2 style={styles.btn}>Historique des sorties</h2>
            </NavLink>
            <NavLink to="/Connections/AdminHome/ModifierHeureSortie">
              <h2 style={styles.btn}>Modifier Heure de sortie</h2>
            </NavLink>
          </div>
          <div>
            <img
              src={PhotoAdmin}
              alt="Illustration"
              style={styles.illustration}
              Width="70%"
            />
          </div>
        </div>
      );
      break;

    case "settings":
      content = (
        <div style={styles.bodyCont2}>
          <div style={styles.body1}>
            <h1 style={styles.titre1}>
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
        <div style={styles.bodyCont}>
          <div style={styles.body1}>
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
        </div>
      );
      break;

    case "user":
      content = (
        <div style={styles.bodyCont}>
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
        <div style={styles.bodyCont}>
          <div style={styles.body2}>
            <div style={styles.content}>
              <div style={styles.carde}>
                <img src="" alt="Admin" style={styles.profileImg} />
                <div style={styles.buttons}>
                  <button onClick={logout} style={styles.logoutButton}>
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
}
const styles = {
  //home
  bodyContent1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    margin: "0 100px",
    width: "100%",
    "@media (max-width: 360px)": {
      margin: "0 10px",
    },
  },
  body2: {
    flex: 1,
    backgroundColor: "#F0F4F8", // Softer background color for better contrast
    padding: "40px",
    borderRadius: "10px",
    margin: "10px",
    maxWidth: "80%", // Limit the maximum width for larger screens
    minHeight: "90vh", // Set to full height
    display: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    marginTop: "45px",
    marginLeft: "-80px",
  },
  titre: {
    fontSize: "18px",
    width: "270px",
    color: "#3FB9D7",
    textAlign: "center",
    marginBottom: "20px",

    "@media (max-width: 768px)": {
      fontSize: "12px",
      width: "60%",
    },
    "@media (max-width: 480px)": {
      fontSize: "12px",
      width: "40%",
    },
  },
  btn: {
    backgroundColor: "#FF9933",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "14px",
    borderRadius: "8px",
    padding: "12px 20px",
    width: "120%",
    textAlign: "center",
    margin: "0.5rem 0",

    "@media (max-width: 768px)": {
      fontSize: "16px",
      padding: "10px",
      width: "20%",
    },
    "@media (max-width: 480px)": {
      fontSize: "14px",
      padding: "8px",
      width: "20%",
    },
    "@media (max-width: 360px)": {
      fontSize: "14px",
      padding: "8px",
      width: "15%",
    },

    ":hover": {
      backgroundColor: "#FF7800",
    },
  },

  illustration: {
    height: "20%",
    borderRadius: "10px",
    marginBottom: "20px",
    "@media (max-width: 360px)": {
      height: "10%",
    },
    "@media (max-width: 480px)": {
      height: "15%",
    },
  },
  //setting
  bodyCont2: {
    marginLeft: "150px",
    marginTop: "-60px",
    width: "110vh",
    maxWidth: "100vh",
    "@media (max-width: 360px)": {
      marginLeft: "30px",
      width: "40vh",
    },
  },
  body1: {
    marginTop: "-120px",
    width: "80vh",
    "@media (max-width: 360px)": {
      marginLeft: "30px",
      width: "20vh",
    },
  },

  titre1: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#3FB9D7",
    marginBottom: "13px",
    marginLeft: "-100px",
    "@media (max-width: 360px)": {
      fontSize: "12px",
      marginLeft: "-200px",
    },
    "@media (max-width: 480px)": {
      fontSize: "14px",
      marginLeft: "-200px",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#444444",
    padding: "20px",
    borderRadius: "8px",
    width: "320px",
    marginLeft: "-30px",

    "@media (max-width: 360px)": {
      width: "100px",
      padding: "20px",
    },
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "5px",

    "@media (max-width: 360px)": {
      flexDirection: "column",
      alignItems: "stretch",
      marginBottom: "10px",
    },
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#FFFFFF",
    "@media(max-width:360px)": {
      fontSize: "8px",
    },
  },
  input: {
    width: "70%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #CCCCCC",
    backgroundColor: "#5C5C5C",
    color: "#FFFFFF",

    "@media (max-width: 360px)": {
      width: "20%",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",

    "@media (max-width: 360px)": {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#FF9933",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "2px solid #FF9933",
    cursor: "pointer",

    "@media (max-width: 360px)": {
      width: "40%",
    },
  },

  //user

  //logout

  body: {
    flex: 1,
    backgroundColor: "#F0F4F8", // Softer background color for better contrast
    padding: "40px",
    borderRadius: "10px",
    margin: "0 auto",
    maxWidth: "1200px", // Limit the maximum width for larger screens
    minHeight: "100vh", // Set to full height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    "@media (max-width: 1024px)": {
      maxWidth: "900px",
      padding: "15px",
    },
    "@media (max-width: 768px)": {
      maxWidth: "600px",
      padding: "10px",
    },
    "@media (max-width: 480px)": {
      maxWidth: "100%",
      padding: "5px",
    },
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "10px",
  },
  illustrationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    Width: "20%",

    "@media (max-width: 768px)": {
      order: -1, // Move image above text
      marginBottom: "20px",
    },
    "@media (max-width: 340px)": {
      order: -1, // Move image above text
      marginBottom: "20px",
      width: "30%",
      height: "20%",
    },
  },
  bodyCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // Occupe toute la hauteur de la fenêtre
    padding: "5px",
    margin: "20px",
    width: "100%",
    marginLeft: "40px",
    marginTop: "20px",
    /*   position:'fixed', */
    "@media (max-width: 360px)": {
      padding: " 5px",
      width: "20%",
      marginLeft: "10px",
    },

    "@media (max-width: 768px)": {
      padding: "7px 0",
      width: "40%",
      marginLeft: "-10px",
    },
  },

  //setting

  card: {
    width: "300px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",

    "@media (max-width: 768px)": {
      width: "90%",
      marginBottom: "20px",
    },
  },
  profileImageContainer: {
    width: "100px",
    height: "100px",
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

  notificationBox: {
    width: "100%",
    maxWidth: "350px",
    backgroundColor: "#444444",
    color: "#FFFFFF",
    borderRadius: "8px",
    padding: "15px",
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",

    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  header1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #555555",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  menu: {
    display: "flex",
    borderBottom: "1px solid #555555",
    marginBottom: "10px",
  },
  notifications: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  notification: {
    padding: "10px 0",
    borderBottom: "1px solid #555555",
  },
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#F0F4F8",
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
      width: "80%",
      padding: "20px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",

    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "10px",
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
      width: "100%",
    },
  },
};

export default AdminBody;
