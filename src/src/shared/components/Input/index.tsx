import { TextField } from "@mui/material";
import type { InputProps } from "mf-types";

export const Input = ({
  name,
  value,
  label,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <TextField
      {...(rest as any)}
      name={name}
      label={label}
      value={value}
      fullWidth
      onChange={(e) => onChange?.(e.target.value)}
      slotProps={{
        inputLabel: { shrink: true },
      }}
    />
  );
};

export default Input;
