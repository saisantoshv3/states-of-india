import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    base: '/states-of-india/',
    build: {
        outDir: '../docs',
        emptyOutDir: true,
    },
    publicDir: '../public',
});
