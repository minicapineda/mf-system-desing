import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@/shared";
import { Form } from "@/shared/components/Form";
import { validatorSchemaFormRegister } from "@/validators";

export const ClientesPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2500);
		return () => clearTimeout(timer);
	}, []);

	const handleSaveCliente = (datos: Record<string, string>) => {
		console.log("Datos validados y listos:", datos);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
				Módulo de Clientes
			</Typography>

			<Form
				title="Registrar Nuevo Cliente"
				isLoading={loading}
				onSubmit={handleSaveCliente}
				buttonText="Guardar Cliente"
				validationSchema={validatorSchemaFormRegister}
				extraFields={[
					{
						name: "phone",
						label: "Teléfono de Contacto",
						type: "tel",
					},
					{
						name: "type_document",
						label: "Tipo de Documento",
						type: "text",
					},
					{
						name: "document",
						label: "Número de Documento",
						type: "text",
					},
				]}
			/>
			<Button label="Borrar" color="secondary" />
		</Box>
	);
};
