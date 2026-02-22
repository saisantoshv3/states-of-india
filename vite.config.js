import { defineConfig } from 'vite';

export default defineConfig({
    base: '/states-of-india/',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
    },
});
