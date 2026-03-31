import {
	CircularProgress,
	Button as MuiButton,
	StyledEngineProvider,
} from "@mui/material";
import type { ButtonProps } from "mf-types";
// Esto ahora cargará correctamente src/ui/tokens/index.ts
import { BUTTON_VARIANTS, UI_TOKENS } from "mf-types";

import styles from "./button.module.css";

export const Button = ({
	label,
	variant = BUTTON_VARIANTS.SOLID,
	color = UI_TOKENS.colors.primary,
	size = UI_TOKENS.sizes.md,
	radius = UI_TOKENS.radius.md,
	disabled = false,
	loading = false,
	onClick,
	fullWidth = false,
	type = "button",
}: ButtonProps) => {
	const getMuiVariant = (): "contained" | "outlined" | "text" => {
		const v = variant as string;
		if (v === BUTTON_VARIANTS.OUTLINE) return "outlined";
		if (v === BUTTON_VARIANTS.GHOST) return "text";
		return "contained";
	};

	const getMuiSize = (): "small" | "medium" | "large" => {
		const s = size as string;
		if (s === UI_TOKENS.sizes.sm) return "small";
		if (s === UI_TOKENS.sizes.lg) return "large";
		return "medium";
	};

	const className = [
		styles.btn_base,
		styles[`radius_${radius}`],
		fullWidth ? styles.full_width : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<StyledEngineProvider injectFirst>
			<MuiButton
				type={type}
				variant={getMuiVariant()}
				size={getMuiSize()}
				color={
					color as "primary" | "secondary" | "error" | "warning" | "success"
				}
				disabled={disabled || loading}
				onClick={onClick}
				className={className}
				startIcon={
					loading ? <CircularProgress size={18} color="inherit" /> : null
				}
			>
				{loading ? "Cargando..." : label}
			</MuiButton>
		</StyledEngineProvider>
	);
};
