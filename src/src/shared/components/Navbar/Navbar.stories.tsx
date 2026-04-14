import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./index";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

const meta: Meta<typeof Navbar> = {
  title: "Shared/Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <div style={{ minHeight: "200px", backgroundColor: "#f5f5f5" }}>
              <Story />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    ),
  ],
  argTypes: {
    logo: {
      control: "text",
      description: "Texto dinámico para el logo o nombre de la app",
    },

    items: {
      control: "object",
      description: "Arreglo dinámico de objetos { label, path }",
    },
    userName: {
      control: "text",
      description: "Nombre del usuario actual",
    },
    onLogout: {
      action: "logout clicked",
      description: "Función que se ejecuta al cerrar sesión",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logo: "Financia App",
    items: [
      { label: "Home", path: "/" },
      { label: "Features", path: "/features" },
      { label: "Pricing", path: "/pricing" },
    ],
    userName: "Monica Villegas",
  },
};

export const FullNavigation: Story = {
  args: {
    logo: "Dashboard App",
    items: [
      { label: "Overview", path: "/overview" },
      { label: "Analytics", path: "/analytics" },
      { label: "Inventory", path: "/inventory" },
      { label: "Users", path: "/users" },
      { label: "Settings", path: "/settings" },
    ],
  },
};

export const BrandOnly: Story = {
  args: {
    logo: "BrandName",
    items: [],
  },
};

export const LoggedOut: Story = {
  args: {
    logo: "Financia",
    items: [{ label: "Ayuda", path: "/help" }],
    userName: "",
  },
};
