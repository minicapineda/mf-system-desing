import {
  CircularProgress,
  Button as MuiButton,
  StyledEngineProvider,
} from "@mui/material";
import type { ButtonProps } from "mf-types";
import { UI_TOKENS } from "mf-types";

import styles from "./button.module.css";

export const Button = ({
  label,
  color = UI_TOKENS.colors.primary,
  radius = UI_TOKENS.radius.md,
  disabled = false,
  loading = false,
  onClick,
  fullWidth = false,
  type = "button",
}: ButtonProps) => {
  const className = [
    styles.btn_base,
    styles[`radius_${radius}`],
    fullWidth ? styles.full_width : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <StyledEngineProvider injectFirst>
      <MuiButton
        type={type}
        color={
          color as "primary" | "secondary" | "error" | "warning" | "success"
        }
        disabled={disabled || loading}
        onClick={onClick}
        className={className}
        startIcon={
          loading ? <CircularProgress size={18} color="inherit" /> : null
        }
      >
        {loading ? "Cargando..." : label}
      </MuiButton>
    </StyledEngineProvider>
  );
};

export default Button;
