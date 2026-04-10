import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";
import type { Meta, StoryObj } from "@storybook/react";
import type { Invoices, TableColumn } from "mf-types";
import { Table } from "./index";

const theme = createTheme();

const meta: Meta<typeof Table<Invoices>> = {
	title: "Shared/Components/Table",
	component: Table,
	tags: ["autodocs"],
	argTypes: {
		loading: { control: "boolean" },
		rowsPerPage: { control: "number" },
	},
	decorators: [
		(Story) => (
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />

					<Box
						sx={{
							backgroundColor: "#f4f7fa",
							padding: "40px",
							minHeight: "100vh",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Box sx={{ width: "100%", maxWidth: "1200px" }}>
							<Story />
						</Box>
					</Box>
				</ThemeProvider>
			</StyledEngineProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Table<Invoices>>;

const columns: TableColumn<Invoices>[] = [
	{ key: "codigo", header: "Referencia" },
	{ key: "cliente", header: "Nombre Cliente" },
	{ key: "fecha", header: "Fecha Emisión" },
	{
		key: "total",
		header: "Monto Total",
		render: (row: Invoices) => (
			<span style={{ fontWeight: "bold", color: "#2c3e50" }}>{row.total}</span>
		),
	},
];

const data: Invoices[] = [
	{
		id: 1,
		codigo: "FAC-001",
		cliente: "Mónica Villegas",
		total: "$2.500.000",
		fecha: "2026-04-10",
	},
	{
		id: 2,
		codigo: "FAC-002",
		cliente: "Luis Santiago",
		total: "$120.000",
		fecha: "2026-01-15",
	},
	{
		id: 3,
		codigo: "FAC-003",
		cliente: "Innovatech S.A.S",
		total: "$4.300.000",
		fecha: "2025-12-24",
	},
	{
		id: 4,
		codigo: "FAC-004",
		cliente: "Tienda Local",
		total: "$50.000",
		fecha: "2026-03-20",
	},
	{
		id: 5,
		codigo: "FAC-005",
		cliente: "Alpha Corp",
		total: "$890.000",
		fecha: "2026-02-10",
	},
];

export const Default: Story = {
	args: {
		columns: columns,
		data: data,
		totalCount: 10,
		page: 0,
		rowsPerPage: 5,
		loading: false,
	},
};

export const Loading: Story = {
	args: {
		columns: columns,
		data: [],
		loading: true,
		rowsPerPage: 5,
	},
};

export const Empty: Story = {
	args: {
		columns: columns,
		data: [],
		loading: false,
		emptyMessage: "No se encontraron registros.",
	},
};
