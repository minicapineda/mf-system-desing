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
      <Paper elevation={3} className={styles.form_container}>
        <Box className={styles.content_wrapper}>
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
                  className={styles.skeleton_title}
                />
              );
            }

            if (child.props.children) {
              return (
                <Box key={key} className={styles.skeleton_input_wrapper}>
                  <Skeleton
                    variant="rounded"
                    height={40}
                    className={styles.skeleton_input}
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
    <Paper elevation={3} className={styles.form_container}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const values = Object.fromEntries(formData.entries());
          onSubmit(values as Record<string, string>);
        }}
        className={styles.content_wrapper}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Form;
