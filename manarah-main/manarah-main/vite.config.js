import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig(function (_a) {
    var command = _a.command, mode = _a.mode;
    var isBuild = command === 'build';
    return {
        plugins: [react()],
        base: isBuild ? '/manarah/' : '/',
    };
});
