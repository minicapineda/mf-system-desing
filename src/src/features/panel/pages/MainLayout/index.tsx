import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../../../shared"; // Ajusta las rutas de importación

import { Sidebar } from "src/shared/components/Sidebar";
import type { NavItem } from "../../../../../../../packages/mf-types/dist";

export const MainLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  const navItems: NavItem[] = [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
  ];

  const handleLogout = () => {
    console.log("Logout ejecutado");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          backgroundColor: "#f4f6f8",
        }}
      >
        <Navbar
          logo="FINANCIA"
          items={navItems}
          userName="Monica Villegas"
          onLogout={handleLogout}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
