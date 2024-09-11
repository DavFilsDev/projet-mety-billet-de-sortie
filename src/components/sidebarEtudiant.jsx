import React, { useState } from "react";
import imagehome from "../assets/Images/home.png";
import imagesetting from "../assets/Images/setting.png";
import imagelogout from "../assets/Images/logout.png";
import imageuser from "../assets/Images/user.png";
import mylogo from "../assets/Images/Logo.png";
import imagenotification from "../assets/Images/notification.png";
import { useTranslation } from "react-i18next";

function SidebarEtudiant({ onSelectMenu }) {
  const [hovered, setHovered] = useState("");
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleMouseEnter = (menu) => {
    setHovered(menu);
  };

  const handleMouseLeave = () => {
    setHovered("");
  };

  return (
    <div style={styles.SidebarEtudiant}>
      <img src={mylogo} alt="Logo" style={styles.logo} />
      {[
        { name: "home", image: imagehome },
        { name: "user", image: imageuser },
        { name: "notifications", image: imagenotification },
        { name: "settings", image: imagesetting },
        { name: "logout", image: imagelogout },
      ].map((item) => (
        <div
          style={styles.menuItem}
          onClick={() => onSelectMenu(item.name)}
          onMouseEnter={() => handleMouseEnter(item.name)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              ...styles.icon,
              width: hovered === item.name ? "30px" : "20px",
              height: hovered === item.name ? "30px" : "20px",
            }}
          />
          {hovered === item.name && <div style={styles.label}>{item.name}</div>}
        </div>
      ))}
    </div>
  );
}

const styles = {
  SidebarEtudiant: {
    width: "80px",
    backgroundColor: "#009DE1",
    height: "95vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    borderRadius: "20px",
    marginTop: "2px",
    marginBottom: "2px",
    transition: "all 0.3s ease",
  },
  logo: {
    width: "60px",
    marginBottom: "30px",
    transition: "width 0.3s ease",
  },
  menuItem: {
    width: "60px",
    height: "80px",
    marginBottom: "20px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  icon: {
    width: "20px",
    height: "20px",
    transition: "all 0.3s ease",
  },
  label: {
    marginTop: "5px",
    fontSize: "10px",
    color: "white",
    textTransform: "capitalize",
    transition: "font-size 0.3s ease",
  },
  // Styles pour les écrans moyens et petits
  "@media (max-width: 1024px)": {
    SidebarEtudiant: {
      width: "60px",
      height: "auto",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: "10px 0",
      borderRadius: "0 0 20px 20px",
    },
    logo: {
      width: "40px",
      marginBottom: "0",
    },
    menuItem: {
      width: "50px",
      height: "70px",
      marginBottom: "0",
      flexDirection: "row",
    },
    icon: {
      width: "18px",
      height: "18px",
    },
    label: {
      marginTop: "0",
      fontSize: "8px",
    },
  },
  "@media (max-width: 768px)": {
    SidebarEtudiant: {
      width: "100%",
      height: "auto",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: "10px 0",
      borderRadius: "0",
    },
    logo: {
      width: "30px",
    },
    menuItem: {
      width: "40px",
      height: "60px",
    },
    icon: {
      width: "16px",
      height: "16px",
    },
    label: {
      fontSize: "7px",
    },
  },
  // Styles pour les très petits écrans (mobile)
  "@media (max-width: 480px)": {
    SidebarEtudiant: {
      padding: "5px 0",
    },
    logo: {
      width: "25px",
    },
    menuItem: {
      width: "30px",
      height: "50px",
    },
    icon: {
      width: "14px",
      height: "14px",
    },
    label: {
      fontSize: "6px",
    },
  },
};

export default SidebarEtudiant;
