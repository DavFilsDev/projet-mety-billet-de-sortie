import React from 'react';
import PhotoAdmin from '../assets/Images/adminPhoto.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase-config';
import '../styles/AdminBody.css';
function AdminBody({ selectedMenu }) {
    const navigate = useNavigate(); 
    let content;

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Rediriger vers la page principale après déconnexion
        } catch (err) {
            console.log(err);
        }
    };

    switch (selectedMenu) {
        
        case 'home':
            content = (
                <div style={styles.bodyContent1}>
                    <div style={styles.body2}>
 
                        <h6 style={styles.titre}>Responsable de la vie internat</h6>
 
                        <p className='titre5'>Responsable de la vie internat</p>
 
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
                        <img src={PhotoAdmin} alt="Illustration" style={styles.illustration} Width='70%'/>                                    
                    </div>   
                </div>
            );
            break;

            case 'settings':
                content = (
                    <div className='bodyCo1'>
                        <div className='body4'>
                            <h1 className='titre2'>Responsable de vie internat</h1>
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
                <div style={styles.bodyCont}>
                    <h2> Aucune notification pour le moment</h2>
                   {/*  <div style={styles.body1}>
                    <div className="notification-box">
                        <div className="header">
                            <h2>Boîte de réception</h2> */}
                            {/* <button className="close-button">&times;</button> */}
                        
{/*                         <div className="menu">
                            <button className="menu-item active">Tout</button>
                            <button className="menu-item">Non lu</button>
                        </div> */}
                       {/*  <div className="notifications">
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
                    </div>  */}               
                </div>
            );
            break;

            case 'user':
                content = (
                    <div className='bodyCont'>

                        <div className='card'>
                            <div className='profileImageContainer'>
                                <img src="https://media.licdn.com/dms/image/v2/D5603AQE_qFVozIlsiA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721732163177?e=1731542400&v=beta&t=AyWHpBxfqoLuO7xnjpeq7mzKetu71IC-I1aMIwPW2h4"  alt="Photo" className='profileImg'/>
                            </div>
                            <div className='profileName'>Luicencia</div>
                            <div className='profileTitle'>Responsable de la vie des étudiants</div>
                        </div>
                    </div>
                );
                break;

        case 'logout':
            content = (
                <div style={styles.bodyCont}>
                    <div style={styles.body2}>
    
                        <div style={styles.content}>
                            <div style={styles.carde}>
                                <img src="https://media.licdn.com/dms/image/v2/D5603AQE_qFVozIlsiA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721732163177?e=1731542400&v=beta&t=AyWHpBxfqoLuO7xnjpeq7mzKetu71IC-I1aMIwPW2h4" alt="Admin" style={styles.profileImg} />
                                <div style={styles.buttons}>
                                <button onClick={logout} style={styles.logoutButton}>Se déconnecter</button>
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
    body: {
        flex: 1,
        backgroundColor: '#F0F4F8', // Softer background color for better contrast
        borderRadius: '10px',
        margin: '0 auto',
        maxWidth: '1200px', // Limit the maximum width for larger screens
        minHeight: '100vh', // Set to full height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

        '@media (max-width: 1024px)': {
            maxWidth: '900px',
            padding: '15px',
        },
        '@media (max-width: 768px)': {
            maxWidth: '600px',
            padding: '10px',
        },
        '@media (max-width: 480px)': {
            maxWidth: '100%',
            padding: '5px',
        },
    },
  

    //home
    bodyContent1:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin:'0 0',
        width: '100%',
        '@media (max-width: 360px)': {
            margin: '0 10px',
        },
    },
    body2: {
        flex: 1,
        backgroundColor: '#F0F4F8', // Softer background color for better contrast
        borderRadius: '10px',
        maxWidth: '40vw', // Limit the maximum width for larger screens
        minHeight: '80vh', // Set to full height
        display: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 360px)': {
            margin: '0 10px',
        },
    },
 
    titre1: {
        fontSize: '20px',
        width:'400px',
        color: '#000000',
        margin: '30px',
        alignItems: 'center',
        textDecoration: 'underline 10px #FF9933',

        '@media (max-width: 768px)': {
            fontSize: '12px',
            width:'60%',
        },
        '@media (max-width: 480px)': {
            fontSize: '12px',
            width:'40%',
        },
    },
    btn: {
        backgroundColor: '#22bbea',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: '15px',
 
    btn: {
        backgroundColor: '#22bbea',
        color: '#000000',
        fontSize: '13px',
 
        borderRadius: '8px',
        padding: '10px 20px',
        width: '30vw',
        textAlign: 'center',
        margin:'20px 10px',
        textDecoration: 'underline', 
        textDecorationColor: '#22bbea',

        '@media (max-width: 768px)': {
            fontSize: '16px',
            padding: '5px',
            width: '20%',
        },
        '@media (max-width: 480px)': {
            fontSize: '14px',
            padding: '5px',
            width: '20%',
        },
        '@media (max-width: 360px)': {
            fontSize: '14px',
            padding: '5px',
            width: '15%',
        },

        ':hover': {
            backgroundColor: '#FF7800',
        },
    },

    illustration: {
        width: '40vw',
        height: 'auto',
        borderRadius: '10px',
        margin: '10px',
        '@media (max-width: 360px)': {
            height: '20vw',
            margin: '5px',
        },
        '@media (max-width: 480px)': {
            height: '20vw',
            margin: '5px',
        },
    },

    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
    },
    illustrationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        Width: '20%',

        '@media (max-width: 768px)': {
            order: -1, // Move image above text
            marginBottom: '20px',
        },
        '@media (max-width: 340px)': {
            order: -1, // Move image above text
            marginBottom: '20px',
            width: '30%',
            height: '20%',
        },
    },
    bodyCont:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh', // Occupe toute la hauteur de la fenêtre
        padding: '5px',
        margin:'20px',
        width: '100%',
        marginLeft: '40px',
        marginTop: '20px',
      /*   position:'fixed', */
        '@media (max-width: 360px)': {
            padding: ' 5px',
            width: '20%',
            marginLeft: '10px',
            },

        '@media (max-width: 768px)': {
            padding: '7px 0',
            width: '40%',
            marginLeft: '-10px',

        },

        
 
    },
    
   
    
  
    //setting
    
     
    
    card: {
        width: '300px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',

        '@media (max-width: 768px)': {
            width: '90%',
            marginBottom: '20px',
        },
    },
    profileImageContainer: {
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto 10px auto',
        border: '2px solid #3FB9D7',
        marginLeft: '-120px',
    },
    profileImg: {
        width: '50%',
        height: '50%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    profileName: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333333',
        margin: '10px 0 5px 0',
    },
    profileTitle: {
        fontSize: '14px',
        color: '#777777',
    },
   
    notificationBox: {
        width: '100%',
        maxWidth: '350px',
        backgroundColor: '#444444',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '15px',
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',

        '@media (max-width: 768px)': {
            width: '100%',
        },
    },
    header1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #555555',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    menu: {
        display: 'flex',
        borderBottom: '1px solid #555555',
        marginBottom: '10px',
    },
    notifications: {
        maxHeight: '200px',
        overflowY: 'auto',
    },
    notification: {
        padding: '10px 0',
        borderBottom: '1px solid #555555',
    },
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#F0F4F8',
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carde: {
        width: '450px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

        '@media (max-width: 768px)': {
            width: '80%',
            padding: '20px',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',

        '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '10px',
        },
    },
    logoutButton: {
        backgroundColor: '#FF9933',
        color: 'white',
        fontWeight: 'bold',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',

        '@media (max-width: 768px)': {
            width: '100%',
        },
    },
   
};


export default AdminBody;
