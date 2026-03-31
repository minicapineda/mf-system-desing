import {
	Autocomplete,
	Box,
	Button,
	Divider,
	Paper,
	TextField,
} from "@mui/material";
import type { AutocompleteOption, AutocompleteProps } from "mf-types";

import { useState } from "react";

export const AutocompleteCustom = <T extends AutocompleteOption>({
	options,
	onChange,
	onAddNew,
	label,
	...props
}: AutocompleteProps<T>) => {
	const [inputValue, setInputValue] = useState("");

	return (
		<Autocomplete
			{...props}
			options={options}
			onInputChange={(_, value) => setInputValue(value)}
			onChange={(_, newValue) => onChange(newValue)}
			PaperComponent={({ children }) => (
				<Paper>
					{children}
					<Divider />
					<Box sx={{ p: 1 }}>
						<Button
							fullWidth
							color="primary"
							variant="text"
							onMouseDown={(e) => {
								e.preventDefault();
								if (onAddNew) onAddNew(inputValue);
							}}
						>
							+ Añadir nuevo
						</Button>
					</Box>
				</Paper>
			)}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
