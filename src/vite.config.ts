import path from "node:path";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
	const isStorybook =
		process.env.STORYBOOK === "true" ||
		process.env.npm_lifecycle_script?.includes("storybook");

	return {
		root: path.resolve(__dirname),

		define: {
			"process.env": {},
		},

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
				"@": path.resolve(__dirname, "src"),
			},
			extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
		},

		server: {
			port: 5173,
			host: true,
			strictPort: true,
			fs: {
				allow: [
					path.resolve(__dirname, ".."),
					path.resolve(__dirname, "../../packages"),
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
