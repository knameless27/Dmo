const { defineConfig } = require("@vue/cli-service");

const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        components: path.resolve(__dirname, "src/components"),
        api: path.resolve(__dirname, "src/api"),
        styles: path.resolve(__dirname, "src/styles"),
        assets: path.resolve(__dirname, "src/assets"),
        core: path.resolve(__dirname, "src/@core"),
        mix: path.resolve(__dirname, "src/mixins"),
        store: path.resolve(__dirname, "src/store"),
        auth_store: path.resolve(__dirname, "src/store/auth"),
      },
    },
  },
});
