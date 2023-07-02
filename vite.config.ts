import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
// npm i fast-glob
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from "vite-plugin-compression";


// https://vitejs.dev/config/


const defaultConfig = {
  build: {
    minify: "esbuild"
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icon')],
      // 指定symbolId格式
      symbolId: '[name]',
      // symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
}
// see:http://www.5ityx.com/cate104/134659.html

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('mode', mode)
  console.log('command', command)
  if (mode == 'library') {
    console.log("-###")
    return {
      ...defaultConfig,
      build: {
        ...defaultConfig.build || {},
        outDir: 'lib',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/library.ts'),
          name: '@cookee/moobox',
          // the proper extensions will be added
          fileName: 'index',
        },
      }

    }
  }
  return {

  }
  if (command === "serve") {
    return {
      ...defaultConfig
    }
  } else {
    return defaultConfig
  }
})

