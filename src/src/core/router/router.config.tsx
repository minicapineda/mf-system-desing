import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../../features/panel/pages/MainLayout";
import { LazyWrapper } from "../../shared/layouts";

export const router = createBrowserRouter([
	{
		path: "/",
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
				path: "clientes",
				element: (
					<LazyWrapper>
						<div>Módulo de Clientes</div>
					</LazyWrapper>
				),
			},
			{
				path: "facturas",
				element: (
					<LazyWrapper>
						<div>Módulo de Facturas</div>
					</LazyWrapper>
				),
			},
			{
				path: "configuracion",
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
		element: <Navigate to="/" replace />,
	},
]);
