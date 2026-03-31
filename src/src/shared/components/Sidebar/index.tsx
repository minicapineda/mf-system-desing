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

const drawerWidth = 260;

interface SidebarProps {
	open: boolean;
	toggleDrawer: () => void;
}

export const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const menuItems = [
		{ label: "Dashboard", icon: <DashboardIcon />, path: "/" },
		{ label: "Clientes", icon: <PeopleIcon />, path: "/clientes" },
		{ label: "Facturas", icon: <InvoiceIcon />, path: "/facturas" },
		{ label: "Configuración", icon: <SettingsIcon />, path: "/configuracion" },
	];

	return (
		<Drawer
			variant="permanent"
			open={open}
			sx={{
				width: open ? drawerWidth : 70,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: open ? drawerWidth : 70,
					transition: "width 0.3s",
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
							sx={{ display: "block", mb: 1 }}
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
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.label}
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
