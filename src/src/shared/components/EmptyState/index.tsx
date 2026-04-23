import type { EmptyStateData } from "mf-types";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import styles from "./emptystate.module.css";

export const EmptyState = ({
  title,
  description,
  iconName,
  actionLabel,
  actionId,
  onAction,
}: EmptyStateData) => {
  const renderIcon = () => {
    switch (iconName) {
      case "settings":
        return <SettingsIcon className={styles.icon} />;
      case "search":
        return <SearchOffIcon className={styles.icon} />;
      case "empty":
        return <FolderOffIcon className={styles.icon} />;
      default:
        return <InfoIcon className={styles.icon} />;
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <Box className={styles.icon_wrapper}>{renderIcon()}</Box>

        <Box className={styles.content}>
          <Typography variant="h5" className={styles.title}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" className={styles.description}>
              {description}
            </Typography>
          )}
        </Box>

        {actionLabel && (
          <Button
            variant="contained"
            className={styles.button}
            onClick={() => onAction?.(actionId)}
            disableElevation
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmptyState;
