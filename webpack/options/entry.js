/**
 * @description entry это свойство объекта конфига сборщика, указывающее сборщику, откуда брать модули для сборки.
 * Это точка входа для сборщика.
 * @param {object} объект настроек
 * @returns {{index: string}} значение для свойства entry объекта конфига сборщика
 * @see https://webpack.js.org/concepts/entry-points/
 * @example
 * const setEntry = require('entry');
 * // Вернет { index: './src' } - объект по умолчанию. Установит единую точку входа по пути ./src/index.js
 * { entry: setEntry() }
 *
 * // Вернет { main: './js/main' }. Установит единую точку входа по пути ./js/main.js
 * { entry: setEntry({ main: './js/main.js' }) }
 *
 *
 * // Вернет {
 * //   pageOne: './src/pageOne/index.js',
   //   pageTwo: './src/pageTwo/index.js',
   //   pageThree: './src/pageThree/index.js'
 * // }. Установит несколько точек входа по указанным путям
 * { entry: setEntry({
 *    pageOne: './src/pageOne/index.js',
      pageTwo: './src/pageTwo/index.js',
      pageThree: './src/pageThree/index.js'
 * }) }
 */

module.exports = ({ index = './src' } = {}) => {
  return {
    index
  };
};