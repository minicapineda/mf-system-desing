import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import style from "./loading.module.css";

export const Loading = () => {
  return (
    <Fade in={true} timeout={800}>
      <Box className={style.overlay}>
        <CircularProgress size={60} thickness={4} className={style.spinner} />

        <Typography variant="body1" className={style.loadingText}>
          Cargando Financia...
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loading;
