import {
	Box,
	Button,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import type { CreateOptionModalProps } from "mf-types";

import { useEffect, useState } from "react";

export const AddOptionModal = ({
	open,
	onClose,
	onSave,
	initialValue,
	title = "Nuevo registro",
}: CreateOptionModalProps) => {
	const [name, setName] = useState(initialValue);

	useEffect(() => {
		if (open) setName(initialValue);
	}, [open, initialValue]);

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 350,
					bgcolor: "background.paper",
					p: 4,
					borderRadius: 2,
					boxShadow: 24,
				}}
			>
				<Typography variant="h6" mb={2}>
					{title}
				</Typography>
				<TextField
					fullWidth
					label="Nombre"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
				/>
				<Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
					<Button onClick={onClose} color="inherit">
						Cancelar
					</Button>
					<Button variant="contained" onClick={() => onSave(name)}>
						Guardar
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};
