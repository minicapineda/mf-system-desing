import { Box, Paper, Skeleton } from "@mui/material";
import type { FormComponentProps } from "mf-types";
import React from "react";
import styles from "./form.module.css";

interface FormProps extends FormComponentProps {
	children?: React.ReactNode;
}

export const Form = ({ isLoading = false, onSubmit, children }: FormProps) => {
	if (isLoading) {
		const childrenArray = React.Children.toArray(children);

		return (
			<Paper elevation={3} className={styles.formContainer}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
					{childrenArray.map((child) => {
						if (!React.isValidElement<{ children?: React.ReactNode }>(child))
							return null;

						const key = child.key ?? Math.random().toString(36);

						const isTitle =
							typeof child.type !== "string" &&
							(child.type as { name?: string }).name === "Title";

						if (isTitle) {
							return (
								<Skeleton
									key={key}
									variant="text"
									width="60%"
									height={40}
									sx={{ mx: "auto" }}
								/>
							);
						}

						if (child.props.children) {
							return (
								<Box
									key={key}
									sx={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}
								>
									<Skeleton
										variant="rounded"
										width="100%"
										height={40}
										sx={{ maxWidth: "300px" }}
									/>
								</Box>
							);
						}

						return (
							<Skeleton key={key} variant="rounded" width="100%" height={56} />
						);
					})}
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
				{children}
			</Box>
		</Paper>
	);
};
