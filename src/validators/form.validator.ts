import * as Yup from "yup";

export const validatorSchemaFormRegister = Yup.object({
	full_name: Yup.string()
		.trim()
		.min(3, "* El nombre del negocio debe tener mínimo 3 caracteres.")
		.max(100, "* El nombre del negocio no puede superar los 100 caracteres.")
		.required("* El nombre del negocio es obligatorio."),
	type_document: Yup.string()
		.oneOf(["C.C", "NIT", "C.E", "PA"], "* El tipo de documento no es válido.")
		.required("* El tipo de documento es obligatorio."),
	document: Yup.string()
		.min(5, "* El número de documento debe tener mínimo 5 dígitos.")
		.max(15, "* El número de documento no puede superar los 15 dígitos.")
		.required("* El número de documento es obligatorio."),
	email: Yup.string()
		.email("* Formato de correo inválido")
		.required("* El correo es obligatorio."),
	phone: Yup.string().required("* El teléfono es obligatorio."),
});
