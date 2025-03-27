import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import qrcode from 'qrcode-terminal';

const DEPLOYED_URL = 'https://frontend-rak.vercel.app/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-qrcode',
      configResolved() {
        qrcode.generate(DEPLOYED_URL, { small: true }, (qr) => {
          console.log('\nScan this QR code to access your deployed app:');
          console.log(qr);
        });
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
