import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
	title: "Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	argTypes: {
		currentPage: { control: "number" },
		totalPages: { control: "number" },
		onPageChange: { action: "page changed" },
	},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	args: {
		currentPage: 1,
		totalPages: 10,
	},
	render: (args) => {
		const [page, setPage] = useState(args.currentPage);

		return (
			<Pagination
				{...args}
				currentPage={page}
				onPageChange={(p) => setPage(p)}
			/>
		);
	},
};
