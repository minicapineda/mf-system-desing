import {
	AppBar,
	Box,
	Button,
	Container,
	StyledEngineProvider,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Navbar.module.css";

interface NavbarProps {
	title?: string;
	links?: { label: string; href: string }[];
}

export const Navbar = ({ title = "Brand", links = [] }: NavbarProps) => {
	return (
		<StyledEngineProvider injectFirst>
			<AppBar
				position="static"
				elevation={0}
				className={styles.navbar_container}
				sx={{
					backgroundColor: "white",
					color: "black",
					borderBottom: "1px solid #e0e0e0",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							component={RouterLink}
							to="/"
							className={styles.logo}
						>
							{title}
						</Typography>
						<Box
							sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
						>
							{links.map((link) => (
								<Button
									key={link.label}
									component={RouterLink}
									to={link.href}
									className={styles.nav_link}
								>
									{link.label}
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Button variant="contained" color="primary">
								Login
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</StyledEngineProvider>
	);
};
