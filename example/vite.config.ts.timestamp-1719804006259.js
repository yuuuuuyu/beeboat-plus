// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
var pathResolve = (dir) => {
  return resolve("C:\\wplace3\\beeboat-web\\beeboat-plus\\example", ".", dir);
};
var alias = {
  "@": pathResolve("src"),
  "/@": pathResolve("src")
};
function createViteHtmlPlugin() {
  return createHtmlPlugin({
    minify: true,
    entry: "/src/main.ts",
    template: "index.html",
    inject: {
      data: {
        title: "\u9996\u9875",
        injectScript: ``
      },
      tags: [
        {
          injectTo: "body-prepend",
          tag: "div",
          attrs: {
            id: `app-example`,
            class: "bt-child-body"
          }
        }
      ]
    }
  });
}
var vite_config_default = defineConfig({
  resolve: {
    alias
  },
  plugins: [vue(), createViteHtmlPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `@use "@beeboat/bee-theme/src/scss/var.scss" as *;`
        ].join("\n")
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcblxyXG4vLyBcdThERUZcdTVGODRcdTY3RTVcdTYyN0VcclxuY29uc3QgcGF0aFJlc29sdmUgPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiByZXNvbHZlKFwiQzpcXFxcd3BsYWNlM1xcXFxiZWVib2F0LXdlYlxcXFxiZWVib2F0LXBsdXNcXFxcZXhhbXBsZVwiLCAnLicsIGRpcilcclxufVxyXG5cclxuLy8gXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXHJcbmNvbnN0IGFsaWFzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICdAJzogcGF0aFJlc29sdmUoJ3NyYycpLFxyXG4gICcvQCc6IHBhdGhSZXNvbHZlKCdzcmMnKSxcclxufVxyXG5cclxuLypcclxuICogXHU1MjFCXHU1RUZBSFRNTFx1OTg3NVx1OTc2Mlx1NjNEMlx1NEVGNlxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlVml0ZUh0bWxQbHVnaW4oKSB7XHJcbiAgcmV0dXJuIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgIGVudHJ5OiAnL3NyYy9tYWluLnRzJyxcclxuICAgICAgdGVtcGxhdGU6ICdpbmRleC5odG1sJyxcclxuICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdcdTk5OTZcdTk4NzUnLFxyXG4gICAgICAgICAgICAgIGluamVjdFNjcmlwdDogYGAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGFnczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgaW5qZWN0VG86ICdib2R5LXByZXBlbmQnLFxyXG4gICAgICAgICAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGBhcHAtZXhhbXBsZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2J0LWNoaWxkLWJvZHknLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3Z1ZSgpLGNyZWF0ZVZpdGVIdG1sUGx1Z2luKCldLFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IFtcclxuICAgICAgICAgIGBAdXNlIFwiQGJlZWJvYXQvYmVlLXRoZW1lL3NyYy9zY3NzL3Zhci5zY3NzXCIgYXMgKjtgLFxyXG4gICAgICAgIF0uam9pbignXFxuJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyx3QkFBd0I7QUFHakMsSUFBTSxjQUFjLENBQUMsUUFBd0I7QUFDM0MsU0FBTyxRQUFRLG1EQUFtRCxLQUFLLEdBQUc7QUFDNUU7QUFHQSxJQUFNLFFBQWdDO0FBQUEsRUFDcEMsS0FBSyxZQUFZLEtBQUs7QUFBQSxFQUN0QixNQUFNLFlBQVksS0FBSztBQUN6QjtBQUtBLFNBQVMsdUJBQXVCO0FBQzlCLFNBQU8saUJBQWlCO0FBQUEsSUFDcEIsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLFFBQ0YsT0FBTztBQUFBLFFBQ1AsY0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDRjtBQUFBLFVBQ0ksVUFBVTtBQUFBLFVBQ1YsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0gsSUFBSTtBQUFBLFlBQ0osT0FBTztBQUFBLFVBQ1g7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKLENBQUM7QUFDSDtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRSxxQkFBcUIsQ0FBQztBQUFBLEVBQ3RDLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFVBQ2Q7QUFBQSxRQUNGLEVBQUUsS0FBSyxJQUFJO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
