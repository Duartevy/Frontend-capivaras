const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  // Configuração do servidor de desenvolvimento
  devServer: {
    port: 5001,  // Define a porta como 5001 para o servidor de desenvolvimento
    proxy: {
      '/api': {
        target: 'http://localhost:5001',  // Redireciona as requisições da API para a porta 5001
        changeOrigin: true,               // Permitir mudanças na origem (CORS)
        secure: false,                    // Desativa a verificação de certificado SSL
      },
    },
  },

  // Configurações adicionais do Webpack
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js'  // Alias para Vue em modo bundler
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true),
      }),
    ],
  },
});
