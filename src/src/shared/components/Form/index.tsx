import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import type { FormComponentProps } from "mf-types";
import styles from "./form.module.css";

interface FormProps extends FormComponentProps {
	children?: React.ReactNode;
}

export const Form = ({
	title = "Formulario",
	buttonText = "Enviar",
	isLoading = false,
	onSubmit,
	children,
}: FormProps) => {
	if (isLoading) {
		return (
			<Paper elevation={3} className={styles.formContainer}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
					<Skeleton
						variant="text"
						width="60%"
						height={40}
						sx={{ mx: "auto" }}
					/>
					<Skeleton variant="rounded" height={56} />
					<Skeleton variant="rounded" height={56} />
				</Box>
			</Paper>
		);
	}

	return (
		<Paper elevation={3} className={styles.formContainer}>
			<Box
				component="form"
				onSubmit={(e) => {
					e.preventDefault();

					const formData = new FormData(e.currentTarget);
					const values = Object.fromEntries(formData.entries());

					onSubmit(values as Record<string, string>);
				}}
				sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}
			>
				<Typography variant="h5" textAlign="center">
					{title}
				</Typography>

				{children}

				<Button type="submit" variant="contained" fullWidth size="large">
					{buttonText}
				</Button>
			</Box>
		</Paper>
	);
};
