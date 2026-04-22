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
import { CustomModal } from "src/shared/components/CustomModal";

export const ClientesPage = () => {
  const [loading, setLoading] = useState(true);
  const [seleccion, setSeleccion] = useState<AutocompleteOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    full_name: "",
    email: "",
    text: "",
    document: "",
    last_name: "",
    observations: "",
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
    if (isCustomModalOpen) {
      console.log("Datos finales guardados:", values);
      showToast("Registro creado con éxito", "success");
      setIsCustomModalOpen(false);
    } else {
      setIsCustomModalOpen(true);
    }
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

        <div
          className={styles.buttonContainer}
          style={{ marginTop: "20px", display: "flex", gap: "10px" }}
        >
          <Button
            label="Registrar Cliente"
            onClick={() => setIsDialogOpen(true)}
            fullWidth
          />
          <Button
            label="Ver Resumen"
            onClick={() => setIsCustomModalOpen(true)}
            fullWidth
          />
        </div>
      </Form>

      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Cambio de página:", page)}
      />

      <CustomModal
        open={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Crear Nuevo Registro"
        size="md"
        footer={
          <>
            <Button
              label="Cancelar"
              onClick={() => setIsCustomModalOpen(false)}
            />
            <Button label="Guardar" onClick={() => handleSubmit(formValues)} />
          </>
        }
      >
        <p>Complete la información adicional para finalizar el registro.</p>

        <Form isLoading={loading} onSubmit={handleSubmit}>
          <Input
            name="text"
            label="Nombre"
            value={formValues.text}
            onChange={(v: string) => handleChange("text", v)}
          />
          <Input
            name="last_name"
            label="Apellido"
            value={formValues.last_name}
            onChange={(v: string) => handleChange("last_name", v)}
          />
          <Input
            name="document"
            label="Número de Documento"
            value={formValues.document}
            onChange={(v: string) => handleChange("document", v)}
          />

          <Input
            name="observations"
            label="Observaciones"
            value={formValues.observations}
            onChange={(v: string) => handleChange("observations", v)}
          />

          <InputDate
            label="Fecha de Vencimiento"
            value={fechaSimple}
            onChange={(newValue: any) =>
              setFechaSimple(newValue as Date | null)
            }
          />
        </Form>
      </CustomModal>

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
