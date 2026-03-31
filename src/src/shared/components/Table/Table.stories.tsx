import CssBaseline from "@mui/material/CssBaseline";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";
import type { Meta, StoryObj } from "@storybook/react";
import { type Column, Table } from "./index";

const theme = createTheme();

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
}

const meta: Meta<typeof Table<User>> = {
	title: "Shared/Components/Table",
	component: Table,
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
					<div style={{ padding: "2rem" }}>
						<Story />
					</div>
				</ThemeProvider>
			</StyledEngineProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Table<User>>;

const columns: Column<User>[] = [
	{ key: "id", label: "ID", align: "center" },
	{ key: "name", label: "Nombre Completo" },
	{ key: "email", label: "Correo Electrónico" },
	{
		key: "role",
		label: "Rol",
		render: (user: User) => (
			<span
				style={{
					padding: "4px 8px",
					borderRadius: "4px",
					backgroundColor: user.role === "Admin" ? "#fee2e2" : "#dcfce7",
					color: user.role === "Admin" ? "#991b1b" : "#166534",
					fontSize: "0.75rem",
					fontWeight: "bold",
				}}
			>
				{user.role}
			</span>
		),
	},
];

const data: User[] = [
	{
		id: 1,
		name: "Monica Villegas",
		email: "monica@example.com",
		role: "Admin",
	},
	{ id: 2, name: "Luis Santiago", email: "luis@example.com", role: "User" },
	{
		id: 3,
		name: "Santiago Villamizar",
		email: "santi@example.com",
		role: "User",
	},
];

export const Default: Story = {
	args: {
		columns: columns,
		data: data,
	},
};
