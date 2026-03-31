import {
	Table as MuiTable,
	Paper,
	StyledEngineProvider,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import styles from "./Table.module.css";

export interface Column<T> {
	key: keyof T | string;
	label: string;
	align?: "left" | "center" | "right";
	render?: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
	columns: Column<T>[];
	data: T[];
}

export const Table = <T extends { id: string | number }>({
	columns,
	data,
}: DynamicTableProps<T>) => {
	return (
		<StyledEngineProvider injectFirst>
			<TableContainer
				component={Paper}
				className={styles.tableContainer}
				elevation={0}
			>
				<MuiTable>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.label}
									align={column.align || "left"}
									className={styles.headerCell}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.id} className={styles.row}>
								{columns.map((column) => (
									<TableCell
										key={`${row.id}-${String(column.key)}`}
										align={column.align || "left"}
										className={styles.cell}
									>
										{column.render
											? column.render(row)
											: (row[column.key as keyof T] as React.ReactNode)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</StyledEngineProvider>
	);
};
