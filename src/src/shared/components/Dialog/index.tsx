import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import type { CustomDialogProps, DialogVariant } from "mf-types";

export const MyDialog: React.FC<React.PropsWithChildren<CustomDialogProps>> = ({
  isOpen,
  onClose,
  type = "info",
  title,
  onConfirm,
  children,
  confirmLabel,
  cancelLabel = "Cancelar",
  maxWidth = "xs",
  fullWidth = true,
  isLoading = false,
  ...rest
}) => {
  const getConfig = (variant: DialogVariant) => {
    switch (variant) {
      case "delete":
      case "error":
        return { color: "error" as const, defaultLabel: "Eliminar" };
      case "warning":
        return { color: "warning" as const, defaultLabel: "Confirmar" };
      case "success":
        return { color: "success" as const, defaultLabel: "Aceptar" };
      case "form":
        return { color: "primary" as const, defaultLabel: "Guardar" };
      default:
        return { color: "primary" as const, defaultLabel: "Aceptar" };
    }
  };

  const config = getConfig(type);

  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...rest}
    >
      {title && (
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: type === "delete" ? "error.main" : "inherit",
          }}
        >
          {title}
        </DialogTitle>
      )}

      <DialogContent dividers>{children}</DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
          {cancelLabel}
        </Button>

        {onConfirm && (
          <Button
            onClick={onConfirm}
            variant="contained"
            color={config.color}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {confirmLabel || config.defaultLabel}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
};
