import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "./index";

const meta: Meta<typeof Form> = {
	title: "Components/Form",
	component: Form,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;

const extraFields = [
	{
		name: "type_document",
		label: "Tipo de Documento",
		type: "text",
	},
	{
		name: "document",
		label: "Número de Documento",
		type: "text",
	},
];

export const Default: Story = {
	args: {
		title: "Formulario de Cliente",
		buttonText: "Guardar",
		extraFields,

		onSubmit: (data) => console.log(data),
	},
};

export const Loading: Story = {
	args: {
		title: "Formulario cargando",
		isLoading: true,
		extraFields,
	},
};

export const Basic: Story = {
	args: {
		title: "Formulario básico",
		onSubmit: (data) => console.log(data),
	},
};

export const WithErrors: Story = {
	args: {
		title: "Formulario con validación",
		extraFields,
		onSubmit: () => {},
	},
};
