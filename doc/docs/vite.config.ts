import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [],
    build: {
        rollupOptions: {
            plugins: [],
        },
    },
    resolve: {
        alias: {
            assert: 'browser-assert',
            path: 'path-browserify',
        },
    },
    define: {
        'process.platform': '"darwin"',
        'Buffer.isBuffer': 'undefined',
    },
    server: {
        fs: {
            strict: false,
        },
    },
    optimizeDeps: {
        include: [
            '@beeboat/bee-theme/index.ts',
            '@beeboat/components/index.ts',
            '@beeboat/core/index.ts',
        ],
    },
})
