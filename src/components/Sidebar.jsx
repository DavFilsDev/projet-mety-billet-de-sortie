import React, { useState } from "react";
import imagehome from "../assets/Images/home.png";
import imagesetting from "../assets/Images/setting.png";
import imagelogout from "../assets/Images/logout.png";
import imageuser from "../assets/Images/user.png";
import mylogo from "../assets/Images/Logo.png";
import imagenotification from "../assets/Images/notification.png";
import { useTranslation } from "react-i18next";

function Sidebar({ onSelectMenu }) {
  const [hovered, setHovered] = useState("");
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  const handleMouseEnter = (menu) => {
    setHovered(menu);
  };

  const handleMouseLeave = () => {
    setHovered("");
  };

  return (
    <div style={styles.sidebar}>
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
  sidebar: {
    width: "80px",
    backgroundColor: "#009DE1",
    height: "106vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    borderRadius: "20px",
    margin: "0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",

    "@media (max-width: 768px)": {
      flexDirection: "row",
      width: "60px",
      height: "60px",
      paddingTop: "0",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "0",
      justifyContent: "space-between",
    },
    "@media (min-width: 1000px)": {
      width: "120px",
      paddingTop: "50px",
    },
  },
  logo: {
    width: "50px",
    marginBottom: "30px",
    transition: "width 0.3s ease, margin-bottom 0.3s ease",

    "@media (max-width: 768px)": {
      width: "40px",
      marginBottom: "0",
    },
    "@media (min-width: 1000px)": {
      width: "80px",
      marginBottom: "45px",
    },
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
    borderRadius: "10px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    ":hover": {
      backgroundColor: "#3fa1b5",
      transform: "scale(1.05)",
    },
    "@media (max-width: 768px)": {
      width: "30px",
      height: "50px",
      marginBottom: "0",
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  icon: {
    width: "20px",
    height: "20px",
    transition: "width 0.3s ease, height 0.3s ease",

    "@media (max-width: 768px)": {
      width: "15px",
      height: "15px",
    },
  },
  label: {
    marginTop: "5px",
    fontSize: "10px",
    color: "white",
    textTransform: "capitalize",
    transition: "font-size 0.3s ease",
    "@media (max-width: 768px)": {
      fontSize: "8px",
      display: "none", // Hide the labels on small screens for a cleaner look
    },
    "@media (min-width: 1000px)": {
      fontSize: "12px",
    },
  },
};

export default Sidebar;
