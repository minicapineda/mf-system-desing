import { TextField } from "@mui/material";
import type { InputProps } from "mf-types";

export const Input = ({
	name,
	value,
	label,
	type = "text",
	error,
	helperText,
	onChange,
	onBlur,
	...rest
}: InputProps) => {
	return (
		<TextField
			name={name}
			label={label}
			value={value}
			type={type}
			fullWidth
			error={error}
			helperText={helperText}
			onChange={(e) => onChange?.(e.target.value)}
			onBlur={onBlur}
			autoComplete="off"
			InputLabelProps={{ shrink: true }}
			{...rest}
		/>
	);
};
