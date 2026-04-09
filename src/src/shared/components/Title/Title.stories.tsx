import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "./index";

const meta: Meta<typeof Title> = {
	title: "Components/Title",
	component: Title,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["h4", "h5", "h6"],
		},
		align: {
			control: "select",
			options: ["left", "center", "right"],
		},
		isLoading: {
			control: "boolean",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
	args: {
		variant: "h4",
		align: "left",
		isLoading: false,
		children: "Título de ejemplo",
	},
};
