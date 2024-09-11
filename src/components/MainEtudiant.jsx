import React, { useState, useEffect } from "react";
import "../styles/MainStudent.css";
import myEtudiant from "../assets/Images/Etudianthome.png";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";

const MainEtudiant = ({ selectedMenu }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion : ", error);
      });
  };

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    // Fetch user profile
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            console.log("Aucun document trouvé !");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données utilisateur : ",
            error
          );
        });
    }

    // Fetch notifications
    const unsubscribe = onSnapshot(
      collection(db, "notifications"),
      (snapshot) => {
        const fetchedNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(fetchedNotifications);
      }
    );
    return () => unsubscribe();
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== notificationId)
    );
  };

  let content;

  switch (selectedMenu) {
    case "home":
      content = (
        <div style={styles.bodyCon}>
          <div style={styles.roud} className="main-content">
            <div style={styles.cont} className="button-container">
              <NavLink
                to="/student-home/MainEtudiant/SortieBille"
                className="button-link"
              >
                <button className="button orange-button">
                  Envoyer une demande de sortie
                </button>
              </NavLink>
              <NavLink to="/student-home/Historique" className="button-link">
                <button className="button orange-button">
                  Voir l’historique des sorties
                </button>
              </NavLink>
            </div>
            <div className="illustration-container">
              <img
                src={myEtudiant}
                alt="Illustration"
                className="illustration"
              />
            </div>
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
          <div style={styles.notificationContainer}>
            <div style={styles.notificationHeader}>
              <h3>Notifications</h3>
            </div>
            <div style={styles.notificationList}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} style={styles.notificationItem}>
                    <div>
                      <strong>{notification.adminName}</strong> vous donne la
                      permission d'aller à{" "}
                      <strong>{notification.lieuSortie}</strong> de{" "}
                      <strong>{notification.heureSortie}</strong> à{" "}
                      <strong>{notification.heureRetour}</strong> pour{" "}
                      <strong>{notification.raisonSortie}</strong>.
                      <span style={styles.notificationTime}>
                        {new Date(
                          notification.timestamp?.seconds * 1000
                        ).toLocaleString()}
                      </span>
                    </div>
                    <button
                      style={styles.closeButton}
                      onClick={() => markAsRead(notification.id)} // Fonction pour marquer comme lu
                    >
                      <h6>Marquer comme lu</h6>
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucune notification pour le moment.</p>
              )}
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
              <img
                src={userProfile?.photoURL || "http://mail.com/"}
                alt="Photo de Profil"
                style={styles.profileImage}
              />
            </div>
            <div style={styles.profileName}>
              {userProfile?.displayName || "Nom Non Disponible"}
            </div>
            <div style={styles.profileTitle}>
              Etudiant Passerelles Numériques
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
              <div style={styles.carde}>
                <img src="" alt="Etudiant" style={styles.profileImg} />
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
    width: "100%", // S'adapte à la taille de l'écran
    textAlign: "center",
    "@media (max-width: 768px)": {
      padding: "20px",
    },
  },
  roud: {
    //    marginLeft:'-100px',
    //    marginBottom:'200px',
    //    height:'100%',
    //    marginTop:'100px',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    width: "90%",
    maxWidth: "600px",
    "@media (max-width: 768px)": {
      width: "100%",
      padding: "10px",
    },
  },

  bodyContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Occupe toute la hauteur de la fenêtre
    backgroundColor: "#f0f8ff",
    padding: "20px",

    width: "1400px",
  },
  content: {
    width: "400px",
    height: "00px",
  },
  bodyCon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // Occupe toute la hauteur de la fenêtre
    padding: "20px",
    // margin:'50px',
    margin: "auto",
    //width: '90%',
    width: "100%",
    maxWidth: "1200px",
    // marginLeft: '40px',
    // marginTop: '100px',
    // '@media (max-width: 360px)': {
    //     padding: '10px 0',
    //     width: '20px',
    //     marginLeft: '-10px',
    //     marginBottom: '10px',},

    "@media (max-width: 768px)": {
      // padding: '10px 0',
      // width: '40px',
      // marginLeft: '-10px',
      flexDirection: "column",
      padding: "10px",
    },
  },

  container: {
    width: "400px",
    height: "400px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    width: "100%",
  },
  illustration: {
    Width: "100%",
    height: "100%",
    marginBottom: "20px",

    "@media (max-width: 768px)": {
      maxWidth: "80%",
      marginBottom: "10px",
    },
    "@media (max-width: 480px)": {
      maxWidth: "100%",
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
    // width: '600px',
    // heigth:'600px',
    // backgroundColor: '#FFFFFF',
    // borderRadius: '10px',
    // padding: '20px',
    // textAlign: 'center',
    // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    // fontFamily: 'Arial, sans-serif',

    // '@media (max-width: 768px)': {
    //     width: '150px',
    //     marginBottom: '20px',
    // },

    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },

  profileImageContainer: {
    // width: '100px',
    // height: '100px',
    // borderRadius: '50%',
    // overflow: 'hidden',
    // margin: '0 auto 10px auto',
    // border: '2px solid #3FB9D7',

    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 10px",
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
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
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
    backgroundColor: "#CC6600",
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
    backgroundColor: " #22BBEA",
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

  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
  profileImageContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 10px",
    border: "2px solid #3FB9D7",
  },
  profileImage: {
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
};

export default MainEtudiant;
