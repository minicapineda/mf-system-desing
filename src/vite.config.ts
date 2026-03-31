import path from "node:path";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	const isStorybook =
		process.env.npm_lifecycle_script?.includes("storybook") ||
		mode === "storybook";

	return {
		root: process.cwd(),
		plugins: [
			react(),
			!isStorybook &&
				federation({
					name: "mf-system-design",
					filename: "remoteEntry.js",
					exposes: {
						"./Button": "./src/shared/components/Button/index.tsx",
					},
					shared: ["react", "react-dom", "zustand", "@mui/material"],
				}),
		].filter(Boolean),
		resolve: {
			alias: {
				"@": path.resolve(process.cwd(), "src"),
			},
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
		},
		server: {
			port: 5173,
			host: true,
			strictPort: true,
			fs: {
				allow: [
					path.resolve(process.cwd(), ".."),
					path.resolve(process.cwd(), "../../packages"),
				],
			},
		},
		build: {
			target: "esnext",
			minify: false,
			cssCodeSplit: false,
		},
	};
});
