import {
	Box,
	CircularProgress,
	Table as MuiTable,
	Paper,
	StyledEngineProvider,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { TABLE_DENSITY, type TableProps } from "mf-types";
import styles from "./Table.module.css";

export const Table = <T extends { id: string | number }>({
	columns,
	data,
	loading = false,
	emptyMessage = "No se encontraron datos",
	density = TABLE_DENSITY.NORMAL,
}: TableProps<T> & { density?: string }) => {
	return (
		<StyledEngineProvider injectFirst>
			<TableContainer
				component={Paper}
				className={`${styles.tableContainer} ${styles[`density_${density}`]}`}
				elevation={0}
			>
				<MuiTable>
					<TableHead>
						<TableRow className={styles.headerRow}>
							{columns.map((column) => (
								<TableCell
									key={column.header}
									align="left"
									className={styles.headerCell}
								>
									{column.header}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									align="center"
									className={styles.loaderCell}
								>
									<Box py={3}>
										<CircularProgress size={30} />
									</Box>
								</TableCell>
							</TableRow>
						) : data.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									align="center"
									className={styles.emptyCell}
								>
									<Box py={3}>{emptyMessage}</Box>
								</TableCell>
							</TableRow>
						) : (
							data.map((row) => (
								<TableRow key={row.id} className={styles.row}>
									{columns.map((column) => (
										<TableCell
											key={`${row.id}-${String(column.key)}`}
											className={styles.cell}
										>
											{column.render
												? (column.render(row) as React.ReactNode)
												: (row[column.key as keyof T] as React.ReactNode)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</StyledEngineProvider>
	);
};
