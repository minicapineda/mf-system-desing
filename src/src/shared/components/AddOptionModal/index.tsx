import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { CreateOptionModalProps } from "mf-types";
import { useEffect, useState } from "react";
import style from "./addoptionmodal.module.css";

export const AddOptionModal = ({
  open,
  onClose,
  onSave,
  initialValue = "",
  title = "Nuevo registro",
}: CreateOptionModalProps) => {
  const [name, setName] = useState(initialValue);

  useEffect(() => {
    if (open) setName(initialValue);
  }, [open, initialValue]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableRestoreFocus
      disableEnforceFocus
    >
      <Box className={style.modalContainer}>
        <Typography variant="h6" className={style.title}>
          {title}
        </Typography>
        <TextField
          fullWidth
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          slotProps={{
            input: {
              autoComplete: "off",
            },
          }}
        />

        <Stack spacing={2} direction="row" className={style.buttonStack}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button
            variant="outlined"
            onClick={() => onSave(name)}
            disabled={!name.trim()}
          >
            Guardar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddOptionModal;
