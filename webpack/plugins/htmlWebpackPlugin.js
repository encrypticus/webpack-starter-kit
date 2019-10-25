const htmlWebpackPlugin = require('html-webpack-plugin'); // плагин генерирует html-файл в папке назначения

/***
 * @description Плагин генерирует html-файлы в папке назначения
 * @param {Object} options объект настроек плагина.
 * Список всех настроек: https://github.com/jantimon/html-webpack-plugin#options
 * @returns {Object} экземпляр плагина
 * @see https://github.com/jantimon/html-webpack-plugin
 * @example
 * const htmlWebpackPlugin = require('htmlWebpackPlugin');
 * htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index.pug',
      chunks: ['vendors~index', 'index']
    })
 */
module.exports = function (options = '') {
  return {
    plugins: [
      new htmlWebpackPlugin(options)
    ]
  }
};