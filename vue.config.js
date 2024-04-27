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
        'styles': path.resolve(__dirname, 'src/styles'), // Alias para la carpeta de styles
        'assets': path.resolve(__dirname, 'src/assets'), // Alias para la carpeta de styles
        // Puedes agregar más alias según sea necesario
      }
    }
  }
})
