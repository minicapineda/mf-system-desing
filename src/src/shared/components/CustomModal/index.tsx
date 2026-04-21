import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";
import type { CustomModalProps, ModalSize } from "mf-types";
import styles from "./custommodal.module.css";

type Props = CustomModalProps<ReactNode>;

const sizes: Record<ModalSize, number> = {
  sm: 300,
  md: 500,
  lg: 800,
};
export const CustomModal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal_container} sx={{ width: sizes[size] }}>
        <Box className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <IconButton onClick={onClose} aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className={styles.body}>{children}</Box>

        {footer && <Box className={styles.footer}>{footer}</Box>}
      </Box>
    </Modal>
  );
};

export default CustomModal;
