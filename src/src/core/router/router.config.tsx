import type { Invoices } from "mf-types";
import { useEffect, useState } from "react";
import {
	createBrowserRouter,
	Navigate,
	useSearchParams,
} from "react-router-dom";
import { ClientesPage } from "src/features/panel/pages/ClientesPages";
import { ROUTES, Table } from "src/shared";
import { MainLayout } from "../../features/panel/pages/MainLayout";
import { LazyWrapper } from "../../shared/layouts";

const invoicesData: Invoices[] = [
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
		cliente: "Beta Systems",
		total: "$340.000",
		fecha: "2026-04-01",
	},
	{
		id: 7,
		codigo: "FAC-007",
		cliente: "Gamer Store",
		total: "$1.200.000",
		fecha: "2026-03-05",
	},
	{
		id: 8,
		codigo: "FAC-008",
		cliente: "Restaurante Central",
		total: "$45.000",
		fecha: "2026-02-28",
	},
	{
		id: 9,
		codigo: "FAC-009",
		cliente: "Importadora X",
		total: "$7.000.000",
		fecha: "2025-11-15",
	},
	{
		id: 10,
		codigo: "FAC-010",
		cliente: "Farmacia Vida",
		total: "$85.000",
		fecha: "2026-04-05",
	},
];

const InvoicesContainer = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [apiData, setApiData] = useState<Invoices[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const urlPage = Number(searchParams.get("page") || "1");
	const page = Math.max(0, urlPage - 1);
	const rowsPerPage = Number(searchParams.get("rows") || "5");
	const searchTerm = searchParams.get("search") || "";

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 800));

			const allFiltered = invoicesData.filter(
				(f) =>
					f.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
					f.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
			);

			const start = page * rowsPerPage;
			setApiData(allFiltered.slice(start, start + rowsPerPage));
			setTotalCount(allFiltered.length);
			setIsLoading(false);
		};
		fetchData();
	}, [page, rowsPerPage, searchTerm]);

	const updateQueryParams = (params: Record<string, string | number>) => {
		const newParams = new URLSearchParams(searchParams);
		Object.entries(params).forEach(([key, value]) => {
			if (value === "" || value === undefined) newParams.delete(key);
			else newParams.set(key, String(value));
		});
		setSearchParams(newParams);
	};

	return (
		<div style={{ padding: "24px" }}>
			<Table<Invoices>
				data={apiData}
				columns={[
					{ key: "codigo", header: "Referencia" },
					{ key: "cliente", header: "Nombre Cliente" },
					{ key: "fecha", header: "Fecha Emisión" },
					{
						key: "total",
						header: "Monto Total",
						render: (row: Invoices) => (
							<span style={{ fontWeight: "bold", color: "#2c3e50" }}>
								{row.total}
							</span>
						),
					},
				]}
				totalCount={totalCount}
				page={page}
				rowsPerPage={rowsPerPage}
				loading={isLoading}
				onPageChange={(p: number) => updateQueryParams({ page: p + 1 })}
				onSearch={(q: string) => updateQueryParams({ search: q, page: 1 })}
				onRowsPerPageChange={(rpp: number) =>
					updateQueryParams({ rows: rpp, page: 1 })
				}
			/>
		</div>
	);
};

export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: (
					<LazyWrapper>
						<div>Bienvenido</div>
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.CLIENTES.replace("/", ""),
				element: (
					<LazyWrapper>
						<ClientesPage />
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.INVOICES.replace("/", ""),
				element: (
					<LazyWrapper>
						<InvoicesContainer />
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.CONFIGURACION.replace("/", ""),
				element: (
					<LazyWrapper>
						<div>Configuración</div>
					</LazyWrapper>
				),
			},
		],
	},
	{ path: "*", element: <Navigate to={ROUTES.HOME} replace /> },
]);
