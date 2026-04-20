import { Box, Paper, Skeleton } from "@mui/material";
import type { FormComponentProps } from "mf-types";
import React from "react";
import styles from "./form.module.css";

interface FormProps extends FormComponentProps {
  children?: React.ReactNode;
}

export const Form = ({ isLoading = false, onSubmit, children }: FormProps) => {
  const childrenArray = React.Children.toArray(children);

  const titleChild = childrenArray.find((child) => {
    return (
      React.isValidElement(child) &&
      typeof child.type !== "string" &&
      (child.type as { name?: string }).name === "Title"
    );
  });

  const footerChildren = childrenArray.filter((child) => {
    if (!React.isValidElement(child)) return false;

    const isButton =
      typeof child.type !== "string" &&
      (child.type as { name?: string }).name === "Button";

    const isContainer = (
      child.props as { className?: string }
    )?.className?.includes("buttonContainer");

    return isButton || isContainer;
  });

  const formBodyChildren = childrenArray.filter(
    (child) => !footerChildren.includes(child) && child !== titleChild,
  );

  if (isLoading) {
    return (
      <Paper elevation={3} className={styles.form_container}>
        <Box className={styles.padding_container}>
          <Skeleton
            variant="text"
            width="50%"
            height={50}
            className={styles.skeleton_title}
          />
          <Box className={styles.grid_layout}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={`sk-input-${i}`}
                variant="rounded"
                width="100%"
                height={56}
              />
            ))}
          </Box>
          <Box className={styles.footer_container}>
            <Skeleton variant="rounded" width={120} height={40} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className={styles.form_container}>
      <Box className={styles.padding_container}>
        {titleChild && (
          <Box className={styles.title_container}>{titleChild}</Box>
        )}

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const values = Object.fromEntries(formData.entries());
            onSubmit(values as Record<string, string>);
          }}
          className={styles.grid_layout}
        >
          {formBodyChildren}
        </Box>

        {footerChildren.length > 0 && (
          <Box className={styles.footer_container}>{footerChildren}</Box>
        )}
      </Box>
    </Paper>
  );
};

export default Form;
