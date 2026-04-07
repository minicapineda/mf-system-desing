import {
	Box,
	Button,
	Paper,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
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
	isLoading = false,
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

	if (isLoading) {
		return (
			<Paper elevation={3} className={styles.formContainer}>
				<Box
					sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
				>
					<Skeleton
						variant="text"
						width="60%"
						height={40}
						sx={{ alignSelf: "center", mb: 2 }}
					/>

					{allFields.map((field) => (
						<Skeleton
							key={`skeleton-${field.name}`}
							variant="rounded"
							width="100%"
							height={field.multiline ? (field.rows || 4) * 20 + 40 : 56}
							animation="wave"
						/>
					))}

					<Skeleton
						variant="rectangular"
						width="100%"
						height={45}
						sx={{ mt: 1, borderRadius: 1 }}
						animation="wave"
					/>
				</Box>
			</Paper>
		);
	}

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
