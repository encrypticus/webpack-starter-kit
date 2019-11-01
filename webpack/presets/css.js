const cssLoader = require('../loaders/css-loader');
const styleLoader = require('../loaders/style-loader');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssLoader = require('../loaders/postcss-loader');

/**
 * PostCss плагин, добавляющий вендорные префиксы к css-свойствам.
 * Плагин использует свойство 'browserslist' из package.json.
 * Подробнее о browserlist - https://github.com/browserslist/browserslist.
 * @see https://github.com/postcss/autoprefixer#readme
 */
const autoprefixer = require('autoprefixer');

/**
 * PostCss плагин, оптимизирующий css
 * @see https://cssnano.co/
 */
const cssnano = require('cssnano');

// Объект настроек по умолчанию
const defaultOptions = {
  styleLoader: {},
  cssLoader: {
    sourceMap: true
  },
  postcssLoader: {
    plugins: [
      autoprefixer(),
      cssnano({
        preset: 'default'
      })
    ],
    sourceMap: true
  }
};

/** @description module - это свойство объекта конфига сборщика, в котором задаются правила, по которым
 * сборщик будет обрабатывать файлы с тем или иным расширением (модули), а также указываются лоадеры,
 * которые будут обрабатывать эти файлы.
 * @param {Object} options настройки для пресета
 * @returns {Object} свойство объекта конфига сборщика
 */
module.exports = (options = defaultOptions) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            process.env.mode === 'development' ? styleLoader(options.styleLoader) : miniCssExtractPlugin.loader,
            cssLoader(options.cssLoader),
            postcssLoader(options.postcssLoader)
          ]
        }
      ]
    }
  }
};
