import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FieldConfig, FormComponentProps } from "mf-types";
import { type ChangeEvent, type FormEvent, useState } from "react";
import styles from "./form.module.css";

const BASE_FIELDS: FieldConfig[] = [
	{ name: "nombre", label: "Nombre completo", type: "text", required: true },
	{ name: "email", label: "Correo electrónico", type: "email", required: true },
	{ name: "mensaje", label: "Mensaje", type: "text", multiline: true, rows: 4 },
];

export const Form = ({
	title = "Contacto",
	extraFields = [],
	onSubmit,
	buttonText = "Enviar",
}: FormComponentProps) => {
	const allFields = [...BASE_FIELDS, ...extraFields];
	const [formData, setFormData] = useState<Record<string, string>>(() => {
		const initialValues: Record<string, string> = {};
		allFields.forEach((field) => {
			initialValues[field.name] = "";
		});
		return initialValues;
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const filteredData = Object.fromEntries(
			Object.entries(formData).filter(([_, value]) => value !== ""),
		);

		onSubmit(filteredData);
	};

	return (
		<Paper elevation={3} className={styles.formContainer}>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
			>
				<Typography variant="h5" textAlign="center" gutterBottom>
					{title}
				</Typography>

				{allFields.map((field) => (
					<TextField
						key={field.name}
						name={field.name}
						label={field.label}
						type={field.type}
						fullWidth
						required={field.required}
						multiline={field.multiline}
						rows={field.rows}
						value={formData[field.name] || ""}
						onChange={handleChange}
					/>
				))}

				<Button
					type="submit"
					variant="contained"
					fullWidth
					size="large"
					sx={{ mt: 1 }}
				>
					{buttonText}
				</Button>
			</Box>
		</Paper>
	);
};
