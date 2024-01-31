import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import spotlightSidecar from '@spotlightjs/sidecar/vite-plugin';

import dotenv from "dotenv";

// Load environment variables from .env
const env = dotenv.config().parsed;

export default defineConfig({
  plugins: [react()],
  // plugins: [spotlightSidecar(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
		"import.meta.env": {
			...env,
			VITE_API_URL: process.env.VITE_API_URL,
		},
	},
})
