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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./sidebar.module.css";

import type { SidebarProps, SidebarMenuItem } from "mf-types";
import type { ReactNode } from "react";

export const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: SidebarMenuItem[] = [
    { label: "Dashboard", icon: () => <DashboardIcon />, path: "/" },
    { label: "Clients", icon: () => <PeopleIcon />, path: "/clientes" },
    { label: "Invoices", icon: () => <InvoiceIcon />, path: "/facturas" },
    { label: "Settings", icon: () => <SettingsIcon />, path: "/configuracion" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={`${style.drawer} ${open ? style.drawer_open : style.drawer_closed}`}
    >
      <Box
        className={`${style.header} ${open ? style.header_open : style.header_closed}`}
      >
        {open && (
          <Typography variant="h6" className={style.brand_name}>
            FINANCIA
          </Typography>
        )}
        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider className={style.divider} />

      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.label}
              disablePadding
              className={style.list_item}
            >
              <Tooltip title={!open ? item.label : ""} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  className={`${style.nav_button} ${isActive ? style.nav_button_active : ""}`}
                  sx={{ justifyContent: open ? "initial" : "center" }}
                >
                  <ListItemIcon
                    className={`${style.icon} ${open ? style.icon_open : style.icon_closed}`}
                  >
                    {item.icon() as ReactNode}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    className={style.item_text}
                    sx={{ opacity: open ? 1 : 0 }}
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

export default Sidebar;
