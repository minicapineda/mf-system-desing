import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
	const isStorybook =
		process.env.STORYBOOK === "true" ||
		process.env.npm_lifecycle_script?.includes("storybook");

	return {
		plugins: [
			react(),
			tsconfigPaths(),
			!isStorybook &&
				federation({
					name: "mf-system-design",
					filename: "remoteEntry.js",
					exposes: {
						"./Button": "./src/shared/components/Button/index.tsx",
						"./Table": "./src/shared/components/Table/index.tsx",
						"./Pagination": "./src/shared/components/Pagination/index.tsx",
						"./Sidebar": "./src/shared/components/Sidebar/index.tsx",
						"./Form": "./src/shared/components/Form/index.tsx",
						"./Loading": "./src/shared/components/Loading/index.tsx",
						"./AutocompleteCustom":
							"./src/shared/components/AutocompleteCustom/index.tsx",
						"./Navbar": "./src/shared/components/Navbar/index.tsx",
						"./Input": "./src/shared/components/Input/index.tsx",
						"./AddOptionModal":
							"./src/shared/components/AddOptionModal/index.tsx",
					},
					shared: [
						"react",
						"react-dom",
						"zustand",
						"@mui/material",
						"@emotion/react",
						"@emotion/styled",
					],
				}),
		].filter(Boolean),
		resolve: {
			alias: {
				src: "/src",
			},
		},
		server: {
			port: 4173,
			host: true,
			strictPort: true,
			fs: {
				strict: false,
			},
		},
		build: {
			target: "esnext",
			minify: false,
			cssCodeSplit: false,
		},
	};
});
