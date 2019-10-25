const nodePath = require('path'); // модуль платформы node.js; предоставляет утилиты для работы с путями файлов и каталогов

/**
 * @description Свойство output определяет имя конечного бандла. Файл бандла записывается в каталог,
 * указанный параметром path.
 * @param filename имя собранного файла (бандла)
 * @param path каталог, в который будет записан файл бандла
 * @returns {{filename: string, path: string}} значение для свойства 'output' объекта конфига сборщика
 * @see https://webpack.js.org/configuration/output/
 * @example
 * const setOutput = require('output');
 *
 * // Вернет { filename: '[name].js', path: nodePath.resolve(__dirname, 'dist') } - объект по умолчанию.
 * // Если для filename указать значение вида '[name].js' (с квадратными скобками), то имя бандла будет взято
 * // из свойства 'entry' объекта конфига сборщика
 * // Создаст бандл [name].js в каталоге './dist' - './dist/[name].js'
 * { output: setOutput() }
 *
 * // Вернет { filename: 'app.js', path: nodePath.resolve(__dirname, 'prod') } - объект по умолчанию.
 * // Положит бандл по пути './prod/app.js'.
 * { output: setOutput({ filename: 'app.js', path: nodePath.resolve(__dirname, 'prod') }) }
 */
module.exports = ({ filename = '[name].js', path = nodePath.resolve(__dirname, '../../dist') } = {}) => {
  return {
    filename,
    path
  }
};
