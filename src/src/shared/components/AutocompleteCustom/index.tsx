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
import { AddOptionModal } from "../AddOptionModal";

export const AutocompleteCustom = <T extends AutocompleteOption>({
	options,
	onChange,
	onAddNew,
	label,
	value,
	...props
}: AutocompleteProps<T>) => {
	const [inputValue, setInputValue] = useState("");
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Autocomplete
				{...props}
				options={options}
				value={value || null}
				getOptionLabel={(option) => option.label}
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
									setOpenModal(true); // 🔥 ABRE MODAL
								}}
							>
								+ Añadir nuevo
							</Button>
						</Box>
					</Paper>
				)}
				renderInput={(params) => <TextField {...params} label={label} />}
			/>

			{/* 🔥 MODAL */}
			<AddOptionModal
				open={openModal}
				initialValue={inputValue}
				onClose={() => setOpenModal(false)}
				onSave={(name) => {
					const newOption = {
						id: name,
						label: name,
					} as T;

					onAddNew?.(name);
					onChange(newOption);

					setOpenModal(false);
				}}
			/>
		</>
	);
};
