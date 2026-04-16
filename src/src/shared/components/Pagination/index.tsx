import {
  Pagination as MuiPagination,
  Stack,
  StyledEngineProvider,
} from "@mui/material";
import type { PaginationProps } from "mf-types";
import type React from "react";
import styles from "./Pagination.module.css";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  disabled = false,
}: PaginationProps) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <Stack
          sx={{
            spacing: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <MuiPagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            siblingCount={siblingCount}
            disabled={disabled}
            color="primary"
            size="medium"
            shape="rounded"
            variant="outlined"
            className={styles.paginationRoot}
          />
        </Stack>
      </div>
    </StyledEngineProvider>
  );
};
