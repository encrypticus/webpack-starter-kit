/* eslint-disable */
'use strict';

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const projectConfig = require('./config.js');

const dir = projectConfig.dir;
const mkdirp = require('mkdirp');

const blockName = process.argv[2];
const defaultExtensions = ['scss', 'pug']; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
  const dirPath = `${dir.blocks}${blockName}/`; // полный путь к создаваемой папке блока
  mkdirp(dirPath, (err) => {                    // создаем
    // Если какая-то ошибка — покажем
    if (err) {
      console.error(`[NTH] Отмена операции: ${err}`);
    }

    // Нет ошибки, поехали!
    else {
      console.log(`[NTH] Создание папки: ${dirPath} (если отсутствует)`);

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach((extension) => {
        const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
        let fileContent = '';                                   // будущий контент файла
        let fileCreateMsg = '';                                 // будущее сообщение в консоли при создании файла

        if (extension === 'scss') {
          fileContent = `.${blockName} {\n  $block-name: &; // #{$block-name}__element\n}\n`;
          // fileCreateMsg = '';
        }

        else if (extension === 'js') {
          fileContent = '';
        }

        else if (extension === 'md') {
          fileContent = '';
        }

        else if (extension === 'pug') {
          fileContent = `mixin ${blockName}(mods)\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}_' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    `;
        }

        else if (extension === 'img') {
          const imgFolder = `${dirPath}img/`;
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, (err) => {
              if (err) console.error(err);
              else console.log(`[NTH] Создание папки: ${imgFolder} (если отсутствует)`);
            });
          } else {
            console.log(`[NTH] Папка ${imgFolder} НЕ создана (уже существует) `);
          }
        }

        else if (extension === 'bg-img') {
          const imgFolder = `${dirPath}bg-img/`;
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, (err) => {
              if (err) console.error(err);
              else console.log(`[NTH] Создание папки: ${imgFolder} (если отсутствует)`);
            });
          } else {
            console.log(`[NTH] Папка ${imgFolder} НЕ создана (уже существует) `);
          }
        }

        if (fileExist(filePath) === false && extension !== 'img' && extension !== 'bg-img' && extension !== 'md') {
          fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
              return console.log(`[NTH] Файл НЕ создан: ${err}`);
            }
            console.log(`[NTH] Файл создан: ${filePath}`);
            if (fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        }
        else if (extension !== 'img' && extension !== 'bg-img' && extension !== 'md') {
          console.log(`[NTH] Файл НЕ создан: ${filePath} (уже существует)`);
        }
        else if (extension === 'md') {
          fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
            if (err) {
              return console.log(`[NTH] Файл НЕ создан: ${err}`);
            }
            console.log(`[NTH] Файл создан: ${dirPath}readme.md`);
            if (fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        }
      });

    }
  });
} else {
  console.log('[NTH] Отмена операции: не указан блок');
}



function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
