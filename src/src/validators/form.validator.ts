import * as Yup from "yup";

export const validatorSchemaFormRegister = Yup.object({
	full_name: Yup.string()
		.trim()
		.min(3, "* El nombre debe tener mínimo 3 caracteres.")
		.max(100, "* El nombre no puede superar los 100 caracteres.")
		.required("* El nombre es obligatorio."),

	email: Yup.string()
		.email("* Formato de correo inválido")
		.required("* El correo es obligatorio."),

	phone: Yup.string().required("* El teléfono es obligatorio."),

	type_document: Yup.string()
		.oneOf(["C.C", "NIT", "C.E", "PA"], "* Tipo inválido")
		.required("* El tipo de documento es obligatorio."),

	document: Yup.string()
		.matches(/^[0-9]+$/, "* Solo se permiten números")
		.length(12, "* Debe tener exactamente 12 dígitos")
		.required("* El documento es obligatorio"),

	mensaje: Yup.string()
		.min(5, "* Muy corto")
		.required("* El mensaje es obligatorio."),
});
