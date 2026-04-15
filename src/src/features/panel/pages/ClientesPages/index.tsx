import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AutocompleteCustom, Button, Pagination } from "src/shared";
import { Form } from "src/shared/components/Form";
import { Input } from "src/shared/components/Input";
import { Title } from "src/shared/components/Title";
import styles from "./clientspages.module.css";
import type { AutocompleteOption } from "../../../../../../../packages/mf-types/dist";
import { InputDate } from "src/shared/components/InputDate";

export const ClientesPage = () => {
  const [loading, setLoading] = useState(true);
  const [seleccion, setSeleccion] = useState<AutocompleteOption | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    full_name: "",
    email: "",
    document: "",
  });
  const [fechaEmision, setFechaEmision] = useState<Date | null>(new Date());

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
        <AutocompleteCustom
          label="Seleccionar Cliente"
          options={misOpciones}
          value={seleccion}
          onChange={(newValue) => setSeleccion(newValue)}
          placeholder="Escribe para buscar..."
        />

        <InputDate
          label="Fecha de Emisión"
          value={fechaEmision}
          onChange={(newValue) => setFechaEmision(newValue)}
          required
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
