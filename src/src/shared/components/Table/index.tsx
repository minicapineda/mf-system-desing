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
  page = 1,
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
        const valA = (a as Record<string, unknown>).fecha;
        const valB = (b as Record<string, unknown>).fecha;

        if (typeof valA === "string" && typeof valB === "string") {
          const dateA = new Date(valA).getTime();
          const dateB = new Date(valB).getTime();
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Listado de Registros
          </Typography>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
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
          <MuiTable stickyHeader sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    sx={{ backgroundColor: "#f8fafc", fontWeight: 600 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="inherit" noWrap>
                        {column.header}
                      </Typography>
                      {column.key === "fecha" && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            setSortDirection(
                              sortDirection === "asc" ? "desc" : "asc",
                            )
                          }
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
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={`loading-${i}`}>
                    {columns.map((col) => (
                      <TableCell key={`loading-${i}-${String(col.key)}`}>
                        <Skeleton height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : processedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Box sx={{ py: 4, color: "text.secondary" }}>
                      {emptyMessage}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                processedData.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column) => {
                      const rawValue = row[column.key as keyof T];
                      const content = (
                        column.render ? column.render(row) : rawValue
                      ) as React.ReactNode;

                      return (
                        <TableCell
                          key={`${row.id}-${String(column.key)}`}
                          sx={{
                            maxWidth: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Tooltip title={String(rawValue ?? "")} arrow>
                            <span>{content}</span>
                          </Tooltip>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <TablePagination
          component="div"
          count={searchTerm ? processedData.length : totalCount || data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => onPageChange?.(p)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
        />
      </Paper>
    </StyledEngineProvider>
  );
};
