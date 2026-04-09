import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Pagination } from "@/shared";
import { Form } from "@/shared/components/Form";
import { Input } from "@/shared/components/Input";
import { Title } from "@/shared/components/Title";
import styles from "./clientspages.module.css";

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
			<Form isLoading={loading} onSubmit={handleSubmit}>
				<Title text="Registro de Clientes" />
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
					name="text"
					label="Texto"
					value={formValues.text}
					onChange={(value: string) => handleChange("text", value)}
				/>

				<Input
					name="document"
					label="Documento"
					value={formValues.document}
					onChange={(value: string) =>
						handleChange("document", value.replace(/\D/g, "").slice(0, 12))
					}
				/>
				<div className={styles.buttonContainer}>
					<Button label="Registrar Cliente" type="submit" fullWidth />
				</div>
			</Form>

			<Pagination
				currentPage={1}
				totalPages={5}
				onPageChange={(page) => console.log("Cambiar a página:", page)}
			/>
		</Box>
	);
};
