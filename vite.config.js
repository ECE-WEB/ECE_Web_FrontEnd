import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all network interfaces (necessary for external access)
    host: '0.0.0.0',

    // Allow connections from any host. This is analogous to webpack-dev-server’s allowedHosts.
    // Depending on your version of Vite or additional plugins, this may be required.
    allowedHosts: 'all',

    // Optionally, if you need to set custom HMR settings (e.g., if using a tunnel or mobile device),
    // you can also add:
     hmr: {
       host: 'mycustomsub.loca.lt'
    }
  },
  assetsInclude: ["**/*.svg"],
})
