import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AutocompleteOption } from "mf-types";
import { useState } from "react";
import { AddOptionModal } from "../AddOptionModal";
import { AutocompleteCustom } from ".";

// 1. Creamos un "Template" que use ambos componentes (el Padre)
const CreatableAutocompleteTemplate = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pendingValue, setPendingValue] = useState("");
	const [options, setOptions] = useState<AutocompleteOption[]>([
		{ id: 1, label: "Monica Villegas" },
		{ id: 2, label: "Santiago Villamizar" },
	]);

	const handleOpenModal = (searchValue: string) => {
		setPendingValue(searchValue);
		setIsOpen(true);
	};

	const handleSave = (newName: string) => {
		const newItem = { id: Date.now(), label: newName };
		setOptions([...options, newItem]);
		setIsOpen(false);
	};

	return (
		<Box sx={{ width: 400, p: 2 }}>
			<AutocompleteCustom
				label="Select or Create User"
				options={options}
				onAddNew={handleOpenModal}
				onChange={(val) => console.log("Selected:", val)}
			/>

			<AddOptionModal
				open={isOpen}
				initialValue={pendingValue}
				onClose={() => setIsOpen(false)}
				onSave={handleSave}
			/>
		</Box>
	);
};

// 2. Configuración de Meta
const meta: Meta = {
	title: "Components/CreatableAutocomplete",
	component: AutocompleteCustom, // El componente principal
	tags: ["autodocs"],
};

export default meta;

// 3. La Historia que "sí sirve" para probar el flujo real
export const FullInteractionFlow: StoryObj = {
	render: () => <CreatableAutocompleteTemplate />,
};

// 4. Una versión simple (sin modal, solo el buscador)
export const BasicSearch: StoryObj = {
	args: {
		label: "Only Search",
		options: [
			{ id: 1, label: "Option A" },
			{ id: 2, label: "Option B" },
		],
	},
};
