import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AutocompleteCustom,
  Button,
  InputDateRange,
  Pagination,
} from "src/shared";
import { Form } from "src/shared/components/Form";
import { Input } from "src/shared/components/Input";
import { Title } from "src/shared/components/Title";
import { MyDialog } from "src/shared/components/Dialog";
import styles from "./clientspages.module.css";
import { InputDate } from "src/shared/components/InputDate";
import type { DateRange, AutocompleteOption, ToastProps } from "mf-types";
import Toast from "src/shared/components/Toast";

export const ClientesPage = () => {
  const [loading, setLoading] = useState(true);
  const [seleccion, setSeleccion] = useState<AutocompleteOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    full_name: "",
    email: "",
    text: "",
    document: "",
  });

  const [rangoEmision, setRangoEmision] = useState<DateRange>({
    start: new Date(),
    end: null,
  });

  const [fechaSimple, setFechaSimple] = useState<Date | null>(new Date());

  const [toastConfig, setToastConfig] = useState<
    Pick<ToastProps, "open" | "message" | "severity">
  >({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message: string, severity: ToastProps["severity"]) => {
    setToastConfig({ open: true, message, severity });
  };

  const handleConfirmRegistration = () => {
    setIsDialogOpen(false);
    // Cambiado a success para que el toast sea verde
    showToast("¡Cliente registrado correctamente!", "success");
  };

  const misOpciones: AutocompleteOption[] = [
    { id: 1, label: "Opción 1" },
    { id: 2, label: "Opción 2" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Iniciando registro para:", values.full_name);
    setIsDialogOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Form isLoading={loading} onSubmit={handleSubmit}>
        <Title text="Registro de Clientes" />

        <Input
          name="full_name"
          label="Nombre completo"
          value={formValues.full_name}
          onChange={(v: string) => handleChange("full_name", v)}
        />

        <Input
          name="email"
          label="Correo"
          value={formValues.email}
          onChange={(v: string) => handleChange("email", v)}
        />

        <Input
          name="document"
          label="Documento"
          value={formValues.document}
          onChange={(v: string) =>
            handleChange("document", v.replace(/\D/g, "").slice(0, 12))
          }
        />

        <AutocompleteCustom
          label="Seleccionar Cliente"
          options={misOpciones}
          value={seleccion}
          onChange={(newValue) => setSeleccion(newValue)}
          placeholder="Escribe para buscar..."
          onAddNew={(name) => console.log("Nuevo cliente:", name)}
        />

        <InputDateRange
          label="Rango de Fecha de Emisión"
          value={rangoEmision}
          onChange={(newValue: any) => setRangoEmision(newValue as DateRange)}
          required
        />

        <InputDate
          label="Fecha de Vencimiento"
          value={fechaSimple}
          onChange={(newValue: any) => setFechaSimple(newValue as Date | null)}
          required
        />

        {/* Mantenemos tu contenedor de estilos original */}
        <div className={styles.buttonContainer} style={{ marginTop: "20px" }}>
          <Button label="Registrar Cliente" type="submit" fullWidth />
        </div>
      </Form>

      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Cambio de página:", page)}
      />

      <MyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type="form"
        title="Confirmar Registro"
        confirmLabel="Registrar"
        onConfirm={handleConfirmRegistration}
      >
        <p>
          ¿Deseas confirmar el registro de{" "}
          <strong>{formValues.full_name}</strong>?
        </p>
      </MyDialog>

      <Toast
        open={toastConfig.open}
        message={toastConfig.message}
        severity={toastConfig.severity}
        onClose={() => setToastConfig({ ...toastConfig, open: false })}
      />
    </Box>
  );
};
