import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField, Button, Typography } from "@mui/material";
import { Form } from "./index";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log(data),
    children: (
      <>
        <Typography variant="h5">Formulario de Cliente</Typography>
        <TextField label="Nombre" name="name" fullWidth />
        <TextField label="Email" name="email" fullWidth />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: (
      <>
        <Typography variant="h5">Formulario cargando</Typography>
        <TextField label="Nombre" />
        <TextField label="Email" />
        <Button variant="contained">Enviar</Button>
      </>
    ),
  },
};

export const Basic: Story = {
  args: {
    onSubmit: (data) => console.log(data),
    children: (
      <>
        <TextField label="Usuario" name="user" fullWidth />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </>
    ),
  },
};

export const WithErrors: Story = {
  args: {
    onSubmit: () => {},
    children: (
      <>
        <TextField
          label="Email"
          name="email"
          error
          helperText="Email inválido"
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          error
          helperText="Mínimo 6 caracteres"
          fullWidth
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </>
    ),
  },
};
