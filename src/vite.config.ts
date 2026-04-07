import path from "node:path";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { type ConfigEnv, defineConfig } from "vite";

export default defineConfig(({ mode }: ConfigEnv) => {
	const isStorybook =
		process.env.npm_lifecycle_script?.includes("storybook") ||
		mode === "storybook";

	return {
		root: path.resolve(__dirname),
		plugins: [
			react(),
			!isStorybook &&
				federation({
					name: "mf-system-design",
					filename: "remoteEntry.js",
					exposes: {
						"./Button": "./src/shared/components/Button/index.tsx",
					},
					shared: ["react", "react-dom", "zustand", "formik", "@mui/material"],
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
