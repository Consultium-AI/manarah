import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  return {
    plugins: [react()],
    base: isBuild ? '/manarah/' : '/',
  };
});


