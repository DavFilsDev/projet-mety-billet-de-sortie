import React from "react";
import "../styles/Connections.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyAdminImage from "../assets/Images/admin.png";
import MyGardienImage from "../assets/Images/gardien.png";
import MyStudentImage from "../assets/Images/etudiant.png";
import { auth, provider, db } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Connections = () => {
  const expand = (role) => {
    const element = document.querySelector(`.${role}`);
    element.classList.toggle("expanded");
  };

  const navigate = useNavigate();
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const signInWithGoogle = async (role) => {
    try {
      const results = await signInWithPopup(auth, provider);
      const email = results.user.email;
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
        email: email,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));

      if (role === "etudiant") {
        // Vérification pour les étudiants dans EtudiantTab
        const studentQuery = query(
          collection(db, "EtudiantTab"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(studentQuery);
        if (!querySnapshot.empty) {
          navigate("/Connections/StudentHome");
        } else {
          alert("Vous n'êtes pas autorisé à accéder en tant qu'étudiant.");
        }
      } else if (role === "gardien") {
        // Vérification pour les gardiens dans GardienTab
        const gardienQuery = query(
          collection(db, "GardienTab"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(gardienQuery);
        if (!querySnapshot.empty) {
          navigate("/Connections/GardeHome");
        } else {
          alert("Vous n'êtes pas autorisé à accéder en tant que gardien.");
        }
      } else if (role === "administrateur") {
        // Tu peux aussi ajouter une vérification similaire pour les administrateurs si nécessaire
        navigate("/Connections/AdminHome");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
      alert("Erreur lors de la connexion avec Google.");
    }
  };

  return (
    <>
      <Header />
      <section>
        <h1>Se connecter en tant que</h1>
        <div className="container">
          <div className="option etudiant" onClick={() => expand("etudiant")}>
            <h3 className="titre">Étudiant</h3>
            <div className="icon">
              <img
                src={MyStudentImage}
                alt="Étudiant"
                width="110"
                height="110"
              />
            </div>
            <button onClick={() => signInWithGoogle("etudiant")}>
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google"
                width={25}
                height={25}
              />
              Se connecter avec Google
            </button>
          </div>
          <div
            className="option administrateur"
            onClick={() => expand("administrateur")}
          >
            <h3 className="titre">Administrateur</h3>
            <div className="icon">
              <img
                src={MyAdminImage}
                alt="Administrateur"
                width="100"
                height="100"
              />
            </div>
            <button onClick={() => signInWithGoogle("administrateur")}>
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google"
                width={20}
                height={20}
              />
              Se connecter avec Google
            </button>
          </div>
          <div className="option gardien" onClick={() => expand("gardien")}>
            <h3 className="titre">Gardien</h3>
            <div className="icon">
              <img
                src={MyGardienImage}
                alt="Gardien"
                width="100"
                height="100"
              />
            </div>
            <button onClick={() => signInWithGoogle("gardien")}>
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google"
                width={20}
                height={20}
              />
              Se connecter avec Google
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Connections;
