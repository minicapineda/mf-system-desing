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
import React, { type ChangeEvent, useState } from "react";
import styles from "./Table.module.css";

type SortOrder = "asc" | "desc" | null;

export const Table = <T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = "No se encontraron datos",
  totalCount = 0,
  page = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onSearch,
}: TableProps<T>) => {
  const muiPage = page - 1;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortOrder>(null);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={0} className={styles.tablePaper}>
        <Box className={styles.tableHeader}>
          <Typography variant="subtitle1">Listado de Registros</Typography>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            className={styles.searchField}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
            slotProps={{
              input: {
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
              },
            }}
          />
        </Box>

        <TableContainer className={styles.tableContainer}>
          <MuiTable stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={`head-${String(column.key)}`}
                    className={styles.headerCell}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                            className={`${styles.sortButton} ${sortDirection ? styles.sortButtonActive : ""}`}
                          >
                            <SortIcon
                              fontSize="small"
                              className={`${styles.sortIcon} ${sortDirection === "desc" ? styles.sortIconDesc : ""}`}
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
                Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                  <TableRow key={`loading-row-${rowIndex}`}>
                    {columns.map((column) => (
                      <TableCell
                        key={`loading-cell-${rowIndex}-${String(column.key)}`}
                        className={styles.loadingCell}
                      >
                        <Skeleton variant="text" height={20} animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Box className={styles.emptyBox}>{emptyMessage}</Box>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} hover className={styles.dataRow}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.id}-${String(column.key)}`}
                        className={styles.dataCell}
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
          count={totalCount || data.length}
          rowsPerPage={rowsPerPage}
          page={muiPage}
          onPageChange={(_, p: number) => onPageChange?.(p + 1)}
          onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
          labelRowsPerPage="Filas:"
          labelDisplayedRows={({ to, count }) =>
            `${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </Paper>
    </StyledEngineProvider>
  );
};

export default Table;
