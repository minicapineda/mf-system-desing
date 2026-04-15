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
import type { DateRange, AutocompleteOption } from "mf-types";

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

  const misOpciones = [
    { id: 1, label: "Opción 1" },
    { id: 2, label: "Opción 2" },
  ];

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
    const data = {
      ...values,
      rango: rangoEmision,
      vencimiento: fechaSimple,
      seleccionado: seleccion?.label,
    };

    console.log("Submit:", data);
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
          name="text"
          label="Texto"
          value={formValues.text}
          onChange={(v: string) => handleChange("text", v)}
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

        <div className={styles.buttonContainer} style={{ marginTop: "20px" }}>
          <Button label="Registrar Cliente" type="submit" fullWidth />
        </div>
      </Form>

      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Página:", page)}
      />

      <MyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        type="delete"
        title="¿Eliminar Cliente?"
        onConfirm={() => {
          console.log("Eliminado");
          setIsDialogOpen(false);
        }}
      >
        <p>Esta acción no se puede deshacer.</p>
      </MyDialog>
    </Box>
  );
};
