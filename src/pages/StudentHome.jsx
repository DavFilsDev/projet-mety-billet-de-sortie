import React, { useState } from "react";
import SidebarEtudiant from "../components/sidebarEtudiant";
import MainEtudiant from "../components/MainEtudiant";
import { useTranslation } from "react-i18next";

function StudentHome() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <div style={styles.app}>
      <SidebarEtudiant onSelectMenu={setSelectedMenu} />
      <MainEtudiant selectedMenu={selectedMenu} />
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
  },
};

export default StudentHome;
