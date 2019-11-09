const babelLoader = require('../loaders/babel-loader');

// Объект настроек по умолчанию
defaultOptions = {
  babelLoader: {
    configFile: require('path').resolve(__dirname, '../configs/babel.config.js')
  },
  exclude: /node_modules/
};

/**
 * @description module - это свойство объекта конфига сборщика, в котором задаются правила, по которым
 * сборщик будет обрабатывать файлы с тем или иным расширением (модули), а также указываются лоадеры,
 * которые будут обрабатывать эти файлы.
 * babelLoader - это объект настроек для лоадера babel-loader
 * @param {Object} options настройки для пресета
 * @returns {Object} свойство объекта конфига сборщика, пресет для js-файлов
 */
module.exports = (options = defaultOptions) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: options.exclude,
          use: babelLoader(options.babelLoader)
        }
      ]
    }
  }
};
