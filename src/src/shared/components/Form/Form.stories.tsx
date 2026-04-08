import type { Meta, StoryObj } from "@storybook/react";
import * as Yup from "yup";
import { Form } from "./index";

const meta: Meta<typeof Form> = {
	title: "Components/Form",
	component: Form,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;

// 🔥 VALIDACIÓN MOCK
const validationSchema = Yup.object({
	full_name: Yup.string().required("Requerido"),
	email: Yup.string().email("Email inválido").required("Requerido"),
	type_document: Yup.string().required("Requerido"),
	document: Yup.string().required("Requerido"),
});

// 🔥 CAMPOS EXTRA
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

// ✅ DEFAULT
export const Default: Story = {
	args: {
		title: "Formulario de Cliente",
		buttonText: "Guardar",
		extraFields,
		validationSchema,
		onSubmit: (data) => console.log(data),
	},
};

// ✅ LOADING
export const Loading: Story = {
	args: {
		title: "Formulario cargando",
		isLoading: true,
		extraFields,
	},
};

// ✅ SIN EXTRA FIELDS
export const Basic: Story = {
	args: {
		title: "Formulario básico",
		onSubmit: (data) => console.log(data),
	},
};

// ✅ CON ERROR (simulado)
export const WithErrors: Story = {
	args: {
		title: "Formulario con validación",
		extraFields,
		validationSchema,
		onSubmit: () => {},
	},
};
