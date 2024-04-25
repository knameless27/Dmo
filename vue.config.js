const { defineConfig } = require('@vue/cli-service')

const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'), // Alias para la carpeta src
        'components': path.resolve(__dirname, 'src/components'), // Alias para la carpeta de componentes
        'api': path.resolve(__dirname, 'src/api'), // Alias para la carpeta de API
        // Puedes agregar más alias según sea necesario
      }
    }
  }
})
