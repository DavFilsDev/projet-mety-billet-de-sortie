import React, { useState } from "react";
import SidebarGardien from "../components/SidebarGardien";
import BodyGardien from "../components/BodyGardien";
import { useTranslation } from "react-i18next";

function GardeHome() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <div style={styles.app}>
      <SidebarGardien onSelectMenu={setSelectedMenu} />
      <BodyGardien selectedMenu={selectedMenu} />
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  "@media (max-width: 768px)": {
    app: {
      top: "20px",
      flexDirection: "column",
      height: "auto",
      width: "100vw",
      padding: "10px",
      margin: "0px",
      gap: "10px",
      SidebarGardien: {
        width: "100%",
        height: "auto",
        BodyGardien: {
          width: "100%",
          height: "auto",
        },
      },
    },
  },
  "@media (max-width: 480px) ": {
    app: {
      top: "20px",
      flexDirection: "column",
      height: "auto",
      width: "100vw",
      padding: "10px",
      margin: "0px",
      gap: "10px",
      SidebarGardien: {
        width: "100%",
        height: "auto",
        BodyGardien: {
          width: "100%",
          height: "auto",
        },
      },
    },
  },
};

export default GardeHome;
