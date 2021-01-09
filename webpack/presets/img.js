const imageLoader = require('../loaders/image-loader');
const imageWebpackLoader = require('../loaders/image-webpack-loader');

// Объект настроек по умолчанию
const defaultOptions = {
  imageLoader: {},
  imageWebpackLoader: {},
  settings: {
    exclude: [/fonts/],
    test: /\.(png|gif|jpg|jpeg|svg)$/
  }
};

/**
 * @description module - это свойство объекта конфига сборщика, в котором задаются правила, по которым
 * сборщик будет обрабатывать файлы с тем или иным расширением (модули), а также указываются лоадеры,
 * которые будут обрабатывать эти файлы.
 * imageLoader - это объект настроек для лоадера file-loader.
 * exclude указывает на ресурсы, которые не будут обрабатываться лоадером. В данном случае по умолчанию для свойства
 * exclude задано регулярное выражение '/fonts/', таким образом лоадер будет обрабатывать все изображения, кроме тех,
 * в url-путях которых присутствует подстрока 'fonts'. Это нужно для того, чтобы лоадер обрабатывал svg-изображения, но
 * не обрабатывал svg-шрифты в стилевых файлах. Например лоадер обработает изображение, которое указано в стилевом
 * правиле: background-image: url('img/sun.svg'), но не обработает шрифт, который указан как src: url('fonts/Abril.svg).
 * Также обработка изображений зависит от переменной окружения 'process.env.mode', указывающий на режим сборки.
 * В режиме 'development' имена изображений в папке назначения будут складываться из имен входных изображений, также
 * изображения не будут оптимизироваться с целью более быстрой сборки. В режиме 'production' имена изображений в папке
 * назначения будут складываться из имен входных изображений плюс восьми символов хэша от их содержимого, также все
 * исходные изображения будут оптимизированы.
 * @param {Object} options настройки для пресета
 * @returns {Object} свойство объекта конфига сборщика, пресет для файлов изображений
 * @example
 * const processImages = require('./webpack/presets/img');
 * // вызов с настройками по умолчанию
 * processImages();
 * // вызов со всоими настройками
 * processImages({
 *  imageLoader: {
 *   name: '[sha512:hash:base64:7].[ext]'
 *  }
 *  regexp: /\.(png|gif|jpg|jpeg|svg|bmp|bitmap)$/
 * });
 */
module.exports = (options = {}) => ({
  module: {
    rules: [
      {
        ...{ ...defaultOptions.settings, ...options.settings },
        use: process.env.mode === 'production' ?
          [
            imageLoader(options.imageLoader),
            imageWebpackLoader(options.imageWebpackLoader)
          ] :
          [
            imageLoader(options.imageLoader)
          ]
      }
    ]
  }
});
