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
import React, { type ChangeEvent, useState } from "react";
import styles from "./Table.module.css";
import type { TableProps } from "mf-types";

type SortOrder = "asc" | "desc" | null;

export const Table = <RowData extends { id: string | number }>({
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
}: TableProps<RowData>) => {
  const muiPage = page - 1;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortOrder>(null);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={0} className={styles.table_paper}>
        <Box className={styles.table_header}>
          <Typography variant="subtitle1">Listado de Registros</Typography>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            className={styles.search_field}
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
                    className={styles.header_cell}
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
                            className={`${styles.sort_button} ${sortDirection ? styles.sort_button_active : ""}`}
                          >
                            <SortIcon
                              fontSize="small"
                              className={`${styles.sort_icon} ${sortDirection === "desc" ? styles.sort_icon_desc : ""}`}
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
                        className={styles.loading_cell}
                      >
                        <Skeleton variant="text" height={20} animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Box className={styles.empty_box}>{emptyMessage}</Box>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} hover className={styles.data_row}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.id}-${String(column.key)}`}
                        className={styles.data_cell}
                      >
                        {column.render
                          ? (column.render(row) as React.ReactNode)
                          : (row[
                              column.key as keyof RowData
                            ] as React.ReactNode)}
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
