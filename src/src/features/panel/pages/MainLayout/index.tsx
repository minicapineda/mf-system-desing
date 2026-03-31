import { Box, styled, Toolbar } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../../../shared";
import { Sidebar } from "../../../../shared/components/Sidebar";

const DRAWER_WIDTH = 260;
const DRAWER_CLOSED_WIDTH = 70;

const NavbarWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
	position: "fixed",
	top: 0,
	right: 0,
	zIndex: theme.zIndex.drawer + 1,
	width: `calc(100% - ${open ? DRAWER_WIDTH : DRAWER_CLOSED_WIDTH}px)`,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: "0.3s",
	}),
}));

export const MainLayout = () => {
	const [open, setOpen] = useState(true);

	const toggleDrawer = () => setOpen(!open);

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<NavbarWrapper open={open}>
				<Navbar title="FINANCIA" />
			</NavbarWrapper>

			<Sidebar open={open} toggleDrawer={toggleDrawer} />

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					backgroundColor: "#f4f6f8",
					width: `calc(100% - ${open ? DRAWER_WIDTH : DRAWER_CLOSED_WIDTH}px)`,
					transition: "width 0.3s",
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};
