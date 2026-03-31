import CssBaseline from "@mui/material/CssBaseline";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Pagination } from "./index";

const theme = createTheme();

const meta: Meta<typeof Pagination> = {
	title: "Shared/Components/Pagination",
	component: Pagination,
	tags: ["autodocs"],
	parameters: {
		docs: {
			source: {
				type: "dynamic",
				excludeDecorators: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Story />
				</ThemeProvider>
			</StyledEngineProvider>
		),
	],
	argTypes: {
		count: {
			control: { type: "number", min: 1 },
			description: "Total de páginas",
		},
		page: { control: { type: "number", min: 1 }, description: "Página actual" },
		color: { control: "select", options: ["primary", "secondary", "standard"] },
		size: { control: "select", options: ["small", "medium", "large"] },
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ELIMINAMOS EL ANY: Usamos el tipo exacto de las props del componente
const PaginationWrapper = (props: React.ComponentProps<typeof Pagination>) => {
	const [page, setPage] = useState<number>(props.page);

	// Sincroniza el estado si cambias la prop desde los controles de Storybook
	useEffect(() => {
		setPage(props.page);
	}, [props.page]);

	return (
		<Pagination {...props} page={page} onChange={(p: number) => setPage(p)} />
	);
};

export const Default: Story = {
	render: (args) => <PaginationWrapper {...args} />,
	args: {
		count: 10,
		page: 1,
		color: "primary",
		size: "medium",
	},
};

export const Large: Story = {
	render: (args) => <PaginationWrapper {...args} />,
	args: {
		count: 5,
		page: 1,
		color: "secondary",
		size: "large",
	},
};
