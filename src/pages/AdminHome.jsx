import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminBody from "../components/AdminBody";
import { useTranslation } from "react-i18next";

function AdminHome() {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { t } = useTranslation(); // Hook pour utiliser les traductions

  return (
    <div style={styles.app}>
      <Sidebar onSelectMenu={setSelectedMenu} />
      <AdminBody selectedMenu={selectedMenu} />
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
  },
};

export default AdminHome;
