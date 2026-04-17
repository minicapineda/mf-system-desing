import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./index";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		name: "name",
		label: "Nombre",
		value: "",
		onChange: (val) => console.log(val),
	},
};

export const WithValue: Story = {
	args: {
		name: "email",
		label: "Correo",
		value: "test@email.com",
		type: "email",
		onChange: (val) => console.log(val),
	},
};

export const WithError: Story = {
	args: {
		name: "password",
		label: "Contraseña",
		value: "",
		type: "password",
		error: true,
		helperText: "Este campo es requerido",
		onChange: (val) => console.log(val),
	},
};

export const Disabled: Story = {
	args: {
		name: "disabled",
		label: "Campo deshabilitado",
		value: "No editable",
		disabled: true,
		onChange: (val) => console.log(val),
	},
};
