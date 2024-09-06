import React from 'react';
import '../styles/Connections.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyAdminImage from '../assets/Images/admin.png';
import MyGardienImage from '../assets/Images/gardien.png';
import MyStudentImage from '../assets/Images/etudiant.png';
import { auth, provider } from '../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
    const expand = (role) => {
        const element = document.querySelector(`.${role}`);
        element.classList.toggle('expanded');
    };

    const navigate = useNavigate();

    const signInWithGoogle = async(role) => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
            email: results.user.email,  
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));

        if (role === 'etudiant') {
            navigate("/Connections/StudentHome");
        } else if (role === 'administrateur') {
            navigate("/Connections/AdminHome");
        } else if (role === 'gardien') {
            navigate("/Connections/GardeHome");
        }
    }

    return (
        <>
            <Header />
            <section>
                <h1>Se connecter en tant que</h1>
                <div className="container">
                    <div className="option etudiant" onClick={() => expand('etudiant')}>
                        <h3 className="titre">Étudiant</h3>
                        <div className="icon">
                            <img src={MyStudentImage} alt="Étudiant" width="110" height="110" />
                        </div>
                        <button onClick={() => signInWithGoogle('etudiant')}>
                            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={25} height={25} />
                            Se connecter avec Google
                        </button>
                    </div>
                    <div className="option administrateur" onClick={() => expand('administrateur')}>
                        <h3 className="titre">Administrateur</h3>
                        <div className="icon">
                            <img src={MyAdminImage} alt="Administrateur" width="100" height="100" />
                        </div>
                        <button onClick={() => signInWithGoogle('administrateur')}>
                            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={20} height={20} />
                            Se connecter avec Google
                        </button>
                    </div>
                    <div className="option gardien" onClick={() => expand('gardien')}>
                        <h3 className="titre">Gardien</h3>
                        <div className="icon">
                            <img src={MyGardienImage} alt="Gardien" width="100" height="100" />
                        </div>
                        <button onClick={() => signInWithGoogle('gardien')}>
                            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={20} height={20} />
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
