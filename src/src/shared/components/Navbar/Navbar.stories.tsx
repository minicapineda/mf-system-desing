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
		title: {
			control: "text",
			description: "Texto dinámico para el logo o nombre de la app",
		},
		links: {
			control: "object",
			description: "Arreglo dinámico de objetos { label, href }",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
	args: {
		title: "Navigationuihguireffr",
		links: [
			{ label: "Home", href: "/" },
			{ label: "Features", href: "/features" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
};

export const FullNavigation: Story = {
	args: {
		title: "Dashboard App",
		links: [
			{ label: "Overview", href: "/overview" },
			{ label: "Analytics", href: "/analytics" },
			{ label: "Inventory", href: "/inventory" },
			{ label: "Users", href: "/users" },
			{ label: "Settings", href: "/settings" },
		],
	},
};

export const BrandOnly: Story = {
	args: {
		title: "BrandName",
		links: [],
	},
};
