import { Box, CircularProgress, Fade, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{ color: "primary.main", mb: 2 }}
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            letterSpacing: 1,

            animation: "pulse 1.5s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.5 },
            },
          }}
        >
          Cargando Financia...
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loading;
