import { Box, Paper, Skeleton } from "@mui/material";
import type { FormComponentProps } from "mf-types";

import styles from "./form.module.css";
import React, { type FC, type PropsWithChildren } from "react";

export const Form: FC<PropsWithChildren<FormComponentProps>> = ({
  isLoading = false,
  onSubmit,
  children,
}) => {
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
      <Paper className={styles.form_container}>
        <Box className={styles.padding_container}>
          <Skeleton variant="text" className={styles.skeleton_title} />
          <Box className={styles.grid_layout}>
            {formBodyChildren.map((child, index) => {
              if (!React.isValidElement(child)) return null;
              const { width, className, style } = child.props as {
                width?: string | number;
                className?: string;
                style?: React.CSSProperties;
              };

              return (
                <Skeleton
                  key={`sk-${index}`}
                  variant="rounded"
                  width={width || "100%"}
                  className={`${styles.skeleton_input} ${className || ""}`}
                  style={style}
                />
              );
            })}
          </Box>
          <Box className={styles.footer_container}>
            <Skeleton variant="rounded" className={styles.skeleton_button} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Box className={styles.form_container}>
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
    </Box>
  );
};

export default Form;
