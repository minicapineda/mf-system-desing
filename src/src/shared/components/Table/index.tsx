import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
	Box,
	IconButton,
	InputAdornment,
	Table as MuiTable,
	Paper,
	Skeleton,
	StyledEngineProvider,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import type { TableProps } from "mf-types";
import React, { type ChangeEvent, useMemo, useState } from "react";
import styles from "./Table.module.css";

type SortOrder = "asc" | "desc" | null;

export const Table = <T extends { id: string | number }>({
	columns,
	data,
	loading = false,
	emptyMessage = "No se encontraron datos",
	totalCount = 0,
	page = 0,
	rowsPerPage = 10,
	onPageChange,
	onRowsPerPageChange,
	onSearch,
}: TableProps<T>) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortDirection, setSortDirection] = useState<SortOrder>(null);

	const processedData = useMemo<T[]>(() => {
		let result = [...data];
		if (searchTerm) {
			result = result.filter((row) =>
				Object.values(row).some((val) =>
					String(val).toLowerCase().includes(searchTerm.toLowerCase()),
				),
			);
		}
		if (sortDirection) {
			result.sort((a, b) => {
				const itemA = a as Record<string, unknown>;
				const itemB = b as Record<string, unknown>;
				if (
					typeof itemA.fecha === "string" &&
					typeof itemB.fecha === "string"
				) {
					const dateA = new Date(itemA.fecha).getTime();
					const dateB = new Date(itemB.fecha).getTime();
					return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
				}
				return 0;
			});
		}
		return result;
	}, [data, searchTerm, sortDirection]);

	return (
		<StyledEngineProvider injectFirst>
			<Paper elevation={0} className={styles.tablePaper}>
				<Box className={styles.tableHeader}>
					<Typography variant="subtitle1" fontWeight={700}>
						Listado de Registros
					</Typography>
					<TextField
						size="small"
						placeholder="Buscar..."
						value={searchTerm}
						className={styles.searchField}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setSearchTerm(e.target.value);
							onSearch?.(e.target.value);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon fontSize="small" />
								</InputAdornment>
							),
							endAdornment: searchTerm && (
								<InputAdornment position="end">
									<IconButton
										size="small"
										onClick={() => {
											setSearchTerm("");
											onSearch?.("");
										}}
									>
										<ClearIcon fontSize="small" />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Box>

				<TableContainer className={styles.tableContainer}>
					<MuiTable stickyHeader>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={String(column.key)}
										sx={{
											backgroundColor: "#f8fafc",
											color: "#475569",
											fontWeight: 600,
											fontSize: "0.75rem",
											textTransform: "uppercase",
											borderBottom: "2px solid #f1f4f9",
										}}
									>
										<Box display="flex" alignItems="center">
											{column.header}
											{column.key === "fecha" && (
												<Tooltip
													title={
														sortDirection === "asc" ? "Recientes" : "Antiguos"
													}
												>
													<IconButton
														size="small"
														onClick={() =>
															setSortDirection(
																sortDirection === "asc" ? "desc" : "asc",
															)
														}
														sx={{
															ml: 0.5,
															color: sortDirection ? "primary.main" : "inherit",
														}}
													>
														<SortIcon
															fontSize="small"
															sx={{
																transform:
																	sortDirection === "desc"
																		? "rotate(180deg)"
																		: "none",
															}}
														/>
													</IconButton>
												</Tooltip>
											)}
										</Box>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								// SOLUCIÓN AL ERROR DE BIOME: Generamos IDs únicos basados en la posición pero sin usar el índice directamente como prop 'key'
								Array.from({ length: rowsPerPage }).map((_, i) => {
									const rowId = `loading-row-${i}`;
									return (
										<TableRow key={rowId}>
											{columns.map((column) => (
												<TableCell
													key={`${rowId}-${String(column.key)}`}
													sx={{ padding: "16px" }}
												>
													<Skeleton
														variant="text"
														height={20}
														animation="wave"
													/>
												</TableCell>
											))}
										</TableRow>
									);
								})
							) : processedData.length === 0 ? (
								<TableRow>
									<TableCell colSpan={columns.length} align="center">
										<Box py={4} color="text.secondary">
											{emptyMessage}
										</Box>
									</TableCell>
								</TableRow>
							) : (
								processedData.map((row) => (
									<TableRow
										key={row.id}
										hover
										sx={{ "&:hover": { backgroundColor: "#f1f5f9" } }}
									>
										{columns.map((column) => (
											<TableCell
												key={`${row.id}-${String(column.key)}`}
												sx={{
													padding: "12px 16px",
													fontSize: "0.875rem",
													color: "#1e293b",
												}}
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

				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={searchTerm ? processedData.length : totalCount || data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(_, p: number) => onPageChange?.(p)}
					onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) =>
						onRowsPerPageChange?.(parseInt(e.target.value, 10))
					}
					labelRowsPerPage="Filas:"
					labelDisplayedRows={({ from, to, count }) =>
						`${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
					}
				/>
			</Paper>
		</StyledEngineProvider>
	);
};
