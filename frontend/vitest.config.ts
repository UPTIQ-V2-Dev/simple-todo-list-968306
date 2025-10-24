import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    define: {
        // Fix for React 19 testing issues
        global: 'globalThis'
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/test/setup.ts',
        css: true,
        pool: 'forks',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/mockData.ts', 'dist/']
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
