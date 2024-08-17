import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// init dotenv config
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  const isDevelopment = command === 'serve';
  
  const envConfig = isDevelopment ? ({
    server: { port: 3000 }
  }) : ({
    base: '/airbnb-clone/'
  });

  return {
    plugins: [react()],
    ...envConfig
  }
})
