import {
	Box,
	Button,
	Paper,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import type { FieldConfig, FormComponentProps } from "mf-types";
import type { AnyObjectSchema } from "yup";
import styles from "./form.module.css";

const BASE_FIELDS: FieldConfig[] = [
	{
		name: "full_name",
		label: "Nombre completo",
		type: "text",
		required: true,
	},
	{
		name: "email",
		label: "Correo electrónico",
		type: "email",
		required: true,
	},
	{
		name: "mensaje",
		label: "Mensaje",
		type: "text",
		multiline: true,
		rows: 4,
	},
];

interface ExtendedFormProps extends FormComponentProps {
	validationSchema?: AnyObjectSchema;
}

export const Form = ({
	title = "Contacto",
	extraFields = [],
	onSubmit,
	buttonText = "Enviar",
	isLoading = false,
	validationSchema,
}: ExtendedFormProps) => {
	const allFields = [...BASE_FIELDS, ...extraFields];

	const formik = useFormik({
		initialValues: Object.fromEntries(
			allFields.map((field) => [field.name, ""]),
		),
		validationSchema,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: (values) => {
			const filteredData = Object.fromEntries(
				Object.entries(values).filter(([_, value]) => value !== ""),
			);
			onSubmit(filteredData);
		},
	});

	if (isLoading) {
		return (
			<Paper elevation={3} className={styles.formContainer}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
					<Skeleton variant="text" width="60%" height={40} />
					{allFields.map((field) => (
						<Skeleton key={field.name} variant="rounded" height={56} />
					))}
				</Box>
			</Paper>
		);
	}

	return (
		<Paper elevation={3} className={styles.formContainer}>
			<Box
				component="form"
				onSubmit={formik.handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}
			>
				<Typography variant="h5" textAlign="center">
					{title}
				</Typography>

				{allFields.map((field) => {
					const hasError =
						(formik.touched[field.name] || formik.submitCount > 0) &&
						Boolean(formik.errors[field.name]);

					return (
						<TextField
							key={field.name}
							name={field.name}
							label={field.label}
							type={field.type}
							fullWidth
							required={field.required}
							multiline={field.multiline}
							rows={field.rows}
							value={formik.values[field.name] || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={hasError}
							helperText={hasError ? (formik.errors[field.name] as string) : ""}
						/>
					);
				})}

				<Button type="submit" variant="contained" fullWidth size="large">
					{formik.isSubmitting ? "Procesando..." : buttonText}
				</Button>
			</Box>
		</Paper>
	);
};
