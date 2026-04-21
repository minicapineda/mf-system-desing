import { Skeleton, Typography } from "@mui/material";
import type { TitleProps } from "mf-types";
import style from "./title.module.css";

interface TitleComponentProps extends TitleProps {
  children?: React.ReactNode;
}

export const Title = ({
  children,
  text,
  variant = "h5",
  align = "center",
  isLoading = false,
}: TitleComponentProps) => {
  const content = children ?? text;

  if (isLoading) {
    const alignmentClass =
      align === "center"
        ? style.skeletonCenter
        : align === "right"
          ? style.skeletonRight
          : style.skeletonLeft;

    return (
      <Skeleton
        variant="text"
        className={`${style.skeleton} ${alignmentClass}`}
      />
    );
  }

  return (
    <Typography align={align} variant={variant}>
      {content}
    </Typography>
  );
};

export default Title;
