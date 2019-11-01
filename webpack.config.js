const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // объединяет массивы и объекты конфигураций из нескольких файлов-модулей
const setEntry = require('./webpack/options/entry'); // опция устанавливает точку входа для сборщика
const setOutput = require('./webpack/options/output'); // опция устанавливает путь, по которому будет лежать бандл
const htmlWebpackPlugin = require('./webpack/plugins/html-webpack-plugin'); // плагин генерирует html-файл в папке сборки
const processCss = require('./webpack/presets/css'); // пресет обрабатывает css-файлы
const processSassScss = require('./webpack/presets/sass-scss'); // пресет обрабатывает sass/scss-файлы
const miniCssExtractPlugin = require('./webpack/plugins/mini-css-extract-plugin'); // модуль обрабатывает css-файлы
const addOptimization = require('./webpack/options/optimization'); // опция добавляет оптимизацию для конечного кода
const generateMap = require('./webpack/options/source-map'); // опция включает генерацию карты js/css-кода (sourcemap)
module.exports = (env, args) => {
  if (args.mode !== 'development' && args.mode !== 'production') {
    args.mode = 'development';
  }

  let mode = 'development';
  let isDevMode = mode === args.mode; // флаг, указывающий режим сборки

  const commonConfig = webpackMerge(
    setEntry({
      index: './src/pages/index/index.js',
      blog: './src/pages/blog/index.js'
    }),
    htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index/index.html',
      excludeChunks: ['blog']
    }),
    htmlWebpackPlugin({
      filename: 'blog.html',
      template: 'src/pages/blog/index.html',
      excludeChunks: ['index']
    }),
    setOutput(),
    miniCssExtractPlugin(),
    processCss(),
    processSassScss()
  );

  if (process.env.mode === 'development') {
    return webpackMerge(
      commonConfig,
      generateMap()
    );
  }

  if (process.env.mode === 'production') {
    return webpackMerge(
      commonConfig,
      addOptimization()
    );
  }
};
