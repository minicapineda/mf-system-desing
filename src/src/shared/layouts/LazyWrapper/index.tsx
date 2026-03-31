import { Box, Fade } from "@mui/material";
import { type ReactNode, Suspense } from "react";
import { Loading } from "../../components/Loading";

export const LazyWrapper = ({ children }: { children: ReactNode }) => (
	<Suspense fallback={<Loading />}>
		<Fade in={true} timeout={500}>
			<Box sx={{ width: "100%", height: "100%" }}>{children}</Box>
		</Fade>
	</Suspense>
);
