import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@/shared";
import { Form } from "@/shared/components/Form";

export const ClientesPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	const handleSaveCliente = (datos: Record<string, string>) => {
		console.log("Datos del cliente listos para enviar al backend:", datos);
	};

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
					Módulo de Clientes
				</Typography>

				<Form
					title="Registrar Nuevo Cliente"
					isLoading={loading}
					onSubmit={handleSaveCliente}
					buttonText="Guardar Cliente"
					extraFields={[
						{
							name: "telefono",
							label: "Teléfono de Contacto",
							type: "tel",
							required: true,
						},
						{
							name: "direccion",
							label: "Dirección de Residencia",
							type: "text",
						},
					]}
				/>
			</Box>
			<Button label="Borrar" color="secondary" />
		</>
	);
};
