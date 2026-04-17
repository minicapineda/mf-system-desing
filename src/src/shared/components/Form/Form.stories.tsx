import type { Meta, StoryObj } from "@storybook/react-vite";

import { Form } from "./index";

const meta: Meta<typeof Form> = {
	title: "Components/Form",
	component: Form,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;


export const Default: Story = {
	args: {
		title: "Formulario de Cliente",
		onSubmit: (data) => console.log(data),
	},
};

export const Loading: Story = {
	args: {
		title: "Formulario cargando",
		isLoading: true,
		
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
		onSubmit: () => {},
	},
};
