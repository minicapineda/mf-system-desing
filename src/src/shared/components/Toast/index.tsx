import React from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";
import type { ToastProps } from "mf-types";

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 6000,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity as AlertColor}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
