import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BUTTON_VARIANTS, UI_TOKENS } from "mf-types";
import { Button } from ".";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: Object.values(BUTTON_VARIANTS),
		},
		color: {
			control: "select",
			options: Object.values(UI_TOKENS.colors),
		},
		size: {
			control: "select",
			options: Object.values(UI_TOKENS.sizes),
		},
		radius: {
			control: "select",
			options: Object.values(UI_TOKENS.radius),
		},
		type: {
			control: "select",
			options: ["button", "submit", "reset"],
		},
		onClick: { action: "clicked" },
	},
	args: {
		label: "Guardar",
		variant: BUTTON_VARIANTS.SOLID,
		color: UI_TOKENS.colors.primary,
		size: UI_TOKENS.sizes.md,
		radius: UI_TOKENS.radius.md,
		disabled: false,
		loading: false,
		fullWidth: false,
		type: "button",
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outline: Story = {
	args: {
		variant: BUTTON_VARIANTS.OUTLINE,
		label: "Cancelar",
	},
};

export const Ghost: Story = {
	args: {
		variant: BUTTON_VARIANTS.GHOST,
		label: "Ver detalle",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		label: "Guardando",
	},
};
