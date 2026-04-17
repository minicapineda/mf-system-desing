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
import type { NavbarProps } from "../../../../../../packages/mf-types/dist";

export const Navbar = ({
  items = [],
  logo = "FINANCIA",
  onLogout,
  userName,
}: NavbarProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            {/* Logo o Título */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
            >
              {logo}
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              {items.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {userName && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {userName}
                </Typography>
              )}

              {onLogout ? (
                <Button variant="outlined" color="primary" onClick={onLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                <Button variant="contained" color="primary">
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Navbar;
