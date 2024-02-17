import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());

  const serverConfig =
    env.VITE_APP_ENV === "development"
      ? {
          server: {
            proxy: {
              "/api": {
                target: env.VITE_API_BASE_URL,
                changeOrigin: true,
                secure: false,
                rewrite: (path: string) => path.replace(/^\/api/, ""),
              },
            },
          },
        }
      : {};

  return defineConfig({
    plugins: [react()],
    ...serverConfig,
  });
};
