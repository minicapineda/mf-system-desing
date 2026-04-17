import {
	Box,
	CssBaseline,
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Invoices, TableColumn } from "mf-types";
import { useMemo, useState } from "react";
import { Table } from "./index";

const theme = createTheme();

const meta: Meta<typeof Table<Invoices>> = {
	title: "Shared/Components/Table",
	component: Table,
	tags: ["autodocs"],
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
		render: (r) => <b style={{ color: "#1e293b" }}>{r.total}</b>,
	},
];

// Datos de prueba (12 registros para poder probar varias páginas)
const mockData: Invoices[] = [
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
	{
		id: 6,
		codigo: "FAC-006",
		cliente: "Test Registro 6",
		total: "$100.000",
		fecha: "2026-02-11",
	},
	{
		id: 7,
		codigo: "FAC-007",
		cliente: "Empresa Siete",
		total: "$500.000",
		fecha: "2026-02-12",
	},
	{
		id: 8,
		codigo: "FAC-008",
		cliente: "Cliente Ocho",
		total: "$80.000",
		fecha: "2026-02-13",
	},
	{
		id: 9,
		codigo: "FAC-009",
		cliente: "Negocio Nueve",
		total: "$2.000",
		fecha: "2026-02-14",
	},
	{
		id: 10,
		codigo: "FAC-010",
		cliente: "Factura Diez",
		total: "$350.000",
		fecha: "2026-02-15",
	},
	{
		id: 11,
		codigo: "FAC-011",
		cliente: "Once S.A.",
		total: "$1.000.000",
		fecha: "2026-02-16",
	},
	{
		id: 12,
		codigo: "FAC-012",
		cliente: "Doce Corp",
		total: "$75.000",
		fecha: "2026-02-17",
	},
];

export const Default: Story = {
	render: (args) => {
		const [currentPage, setCurrentPage] = useState(0);
		const [rowsPerPage, setRowsPerPage] = useState(5);
		const paginatedData = useMemo(() => {
			const start = currentPage * rowsPerPage;
			const end = start + rowsPerPage;
			return mockData.slice(start, end);
		}, [currentPage, rowsPerPage]);

		return (
			<Table
				{...args}
				data={paginatedData}
				page={currentPage}
				rowsPerPage={rowsPerPage}
				totalCount={mockData.length}
				onPageChange={(p) => setCurrentPage(p)}
				onRowsPerPageChange={(rpp) => {
					setRowsPerPage(rpp);
					setCurrentPage(0);
				}}
			/>
		);
	},
	args: {
		columns: columns,
		loading: false,
	},
};
