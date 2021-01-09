const htmlLoader = require('../loaders/html-loader');

// Объект настроек по умолчанию
const defaultOptions = {
  htmlLoader: {},
  settings: {
    test: /\.html$/
  }
};

/**
 * @description module - это свойство объекта конфига сборщика, в котором задаются правила, по которым
 * сборщик будет обрабатывать файлы с тем или иным расширением (модули), а также указываются лоадеры,
 * которые будут обрабатывать эти файлы.
 * @param {Object} options настройки для пресета
 * @param {Object} options.htmlLoader настройки для html-loader (см. https://github.com/webpack-contrib/html-loader/#options)
 * @param {Object} options.settings настройки для модуля (например test, include, exclude... см. https://webpack.js.org/configuration/module/#rule)
 * @returns {Object} свойство объекта конфига сборщика, пресет для pug-файлов
 */
module.exports = (options = {}) => ({
  module: {
    rules: [
      {
        ...{ ...defaultOptions.settings, ...options.settings },
        use: [
          htmlLoader(options.htmlLoader)
        ]
      }
    ]
  }
});
