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
import type { NavbarProps } from "mf-types";
import style from "./navbar.module.css";

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
        className={style.navbar_container}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              className={style.logo}
            >
              {logo}
            </Typography>

            <Box className={style.nav_items_group}>
              {items.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  className={style.nav_link}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box className={style.right_section}>
              {userName && (
                <Typography className={style.user_name}>{userName}</Typography>
              )}

              {onLogout ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onLogout}
                  className={style.action_button}
                >
                  Cerrar Sesión
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={style.action_button}
                >
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
