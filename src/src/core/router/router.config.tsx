import { createBrowserRouter, Navigate } from "react-router-dom";
import { ClientesPage } from "src/features/panel/pages/ClientesPages";
import { ROUTES } from "src/shared";

import { MainLayout } from "../../features/panel/pages/MainLayout";
import { LazyWrapper } from "../../shared/layouts";

export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: (
					<LazyWrapper>
						<div>Bienvenido al Dashboard</div>
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.CLIENTES.replace("/", ""),
				element: (
					<LazyWrapper>
						<div>
							<ClientesPage />
						</div>
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.FACTURAS.replace("/", ""),
				element: (
					<LazyWrapper>
						<div>Módulo de Facturas</div>
					</LazyWrapper>
				),
			},
			{
				path: ROUTES.CONFIGURACION.replace("/", ""),
				element: (
					<LazyWrapper>
						<div>Módulo de Configuración</div>
					</LazyWrapper>
				),
			},
		],
	},
	{
		path: "*",
		element: <Navigate to={ROUTES.HOME} replace />,
	},
]);
