import { Skeleton, Typography } from "@mui/material";
import type { TitleProps } from "mf-types";

interface TitleComponentProps extends TitleProps {
	children?: React.ReactNode;
}

export const Title = ({
	children,
	text,
	variant = "h5",
	align = "center",
	isLoading = false,
}: TitleComponentProps) => {
	const content = children ?? text;

	if (isLoading) {
		return (
			<Skeleton
				variant="text"
				width="60%"
				height={40}
				sx={{ mx: align === "center" ? "auto" : 0 }}
			/>
		);
	}

	return (
		<Typography variant={variant} textAlign={align}>
			{content}
		</Typography>
	);
};
