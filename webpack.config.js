const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // объединяет массивы и объекты конфигураций из нескольких файлов-модулей
const setEntry = require('./webpack/options/entry'); // опция устанавливает точку входа для сборщика
const setOutput = require('./webpack/options/output'); // опция устанавливает путь, по которому будет лежать бандл

module.exports = (env, args) => {
  const commonConfig = {
    entry: setEntry(),
    output: setOutput()
  };

  return webpackMerge(
    commonConfig
  );
};
