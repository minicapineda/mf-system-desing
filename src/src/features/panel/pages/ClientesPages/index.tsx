import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Form } from "@/shared/components/Form";
import { Input } from "@/shared/components/Input";

export const ClientesPage = () => {
	const [loading, setLoading] = useState(true);
	const [formValues, setFormValues] = useState<Record<string, string>>({
		full_name: "",
		email: "",
		document: "",
	});

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2500);
		return () => clearTimeout(timer);
	}, []);

	const handleChange = (field: string, value: string) => {
		setFormValues((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (values: Record<string, string>) => {
		console.log("Datos del formulario:", values);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
				Módulo de Clientes
			</Typography>

			<Form
				title="Registro de Clientes"
				isLoading={loading}
				buttonText="Registrar Cliente"
				onSubmit={handleSubmit}
			>
				<Input
					name="full_name"
					label="Nombre completo"
					value={formValues.full_name}
					onChange={(value: string) => handleChange("full_name", value)}
				/>

				<Input
					name="email"
					label="Correo"
					value={formValues.email}
					onChange={(value: string) => handleChange("email", value)}
				/>

				<Input
					name="document"
					label="Documento"
					value={formValues.document}
					onChange={(value: string) =>
						handleChange("document", value.replace(/\D/g, "").slice(0, 12))
					}
				/>
			</Form>
		</Box>
	);
};
