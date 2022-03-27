"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_node_1 = require("vite-plugin-node");
const server_1 = __importDefault(require("./configs/server"));
// import vitePluginString from 'vite-plugin-string'
exports.default = (0, vite_1.defineConfig)({
    // ...vite configures
    mode: 'development',
    server: {
        // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
        port: parseInt(server_1.default.port),
        hmr: {
            protocol: 'ws',
            host: 'localhost'
        },
        watch: {}
    },
    plugins: [
        ...(0, vite_plugin_node_1.VitePluginNode)({
            // Nodejs native Request adapter
            // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
            // you can also pass a function if you are using other frameworks, see Custom Adapter section
            adapter: 'express',
            // tell the plugin where is your project entry
            appPath: './app/index.ts',
            // Optional, default: 'viteNodeApp'
            // the name of named export of you app from the appPath file
            exportName: 'appInstance',
            // Optional, default: 'esbuild'
            // The TypeScript compiler you want to use
            // by default this plugin is using vite default ts compiler which is esbuild
            // 'swc' compiler is supported to use as well for frameworks
            // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
            tsCompiler: 'esbuild'
        }),
    ]
});
