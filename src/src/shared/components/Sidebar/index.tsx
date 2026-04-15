import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Receipt as InvoiceIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import type {
  SidebarProps,
  SidebarMenuItem,
} from "../../../../../../packages/mf-types/src/ui/sidebar/sidebar.types";
import type { ReactNode } from "react";

const DRAWER_WIDTH = 260;

export const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems: SidebarMenuItem[] = [
    { label: "Dashboard", icon: () => <DashboardIcon />, path: "/" },
    { label: "Clients", icon: () => <PeopleIcon />, path: "/clientes" },
    { label: "Invoices", icon: () => <InvoiceIcon />, path: "/facturas" },
    { label: "Settings", icon: () => <SettingsIcon />, path: "/configuracion" },
  ];

  const transitionStyle = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 70,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: transitionStyle,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : 70,
          transition: transitionStyle,
          overflowX: "hidden",
          backgroundColor: "#1e1e2f",
          color: "white",
          borderRight: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 2,
          minHeight: 64,
        }}
      >
        {open && (
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#4caf50" }}>
            FINANCIA
          </Typography>
        )}
        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.label}
              disablePadding
              sx={{ display: "block", mb: 0.5 }}
            >
              <Tooltip title={!open ? item.label : ""} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    mx: 1,
                    borderRadius: "8px",
                    backgroundColor: isActive
                      ? "rgba(76, 175, 80, 0.2)"
                      : "transparent",
                    color: isActive ? "#4caf50" : "rgba(255,255,255,0.7)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon() as ReactNode}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
