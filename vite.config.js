import { defineConfig } from "vite";
const path = require('path')

export default {
    // assetsInclude: ['**/*.png', '**/*.mp3', '**/*.scss'],
    // base: './',
    root: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
}