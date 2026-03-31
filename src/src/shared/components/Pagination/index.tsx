import {
	Pagination as MuiPagination,
	Stack,
	StyledEngineProvider,
} from "@mui/material";
import type React from "react";
import styles from "./Pagination.module.css";

interface CustomPaginationProps {
	count: number;
	page: number;
	onChange: (page: number) => void;
	color?: "primary" | "secondary" | "standard";
	size?: "small" | "medium" | "large";
}

export const Pagination = ({
	count = 10,
	page = 1,
	onChange,
	color = "primary",
	size = "medium",
}: CustomPaginationProps) => {
	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		onChange(value);
	};

	return (
		<StyledEngineProvider injectFirst>
			<div className={styles.container}>
				<Stack spacing={2}>
					<MuiPagination
						count={count}
						page={page}
						onChange={handleChange}
						color={color}
						size={size}
						shape="rounded"
						variant="outlined"
						className={styles.paginationRoot}
					/>
				</Stack>
			</div>
		</StyledEngineProvider>
	);
};
