import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ElectroAudiogram',
      fileName: (format) => `electro-audiogram.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'vue'], // 排除框架依赖
      output: {
        globals: {
          react: 'React',
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    dts({ // 生成类型声明
      insertTypesEntry: true,
    })
  ],
  server: {
    port: 3000, // 指定开发服务器端口
    open: true, // 自动打开浏览器
  },
});