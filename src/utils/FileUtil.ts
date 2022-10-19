import * as fs from 'fs';

const mime = require('mime');

/**
 * 获取指定目录下的所有文件名的方法
 * @param dirPath 指定目录
 */
export let readDirs = (dirPath: string): Promise<Array<string>> => {
  return new Promise(async (resolve, reject) => {
    let files: Array<string> = await readDirForOneLayer(dirPath);
    let secondLevel: Array<Promise<Array<string>>> = [];
    let result: Array<string> = [];

    result = files.filter((file) => {
      if (checkIsFile(file)) return true;

      secondLevel.push(readDirForOneLayer(`${dirPath}/${file}`));
      return false;
    });

    if (secondLevel.length === 0) {
      resolve(result);
      return;
    }

    Promise.all(secondLevel)
      .then((second) => {
        let files = second.flat().filter((item) => checkIsFile(item));
        resolve([...result, ...files]);
      })
      .catch((err) => reject(err));
  });
};

export let checkIsFile = (path: string): boolean => {
  return mime.getType(path);
};

export let readDirForOneLayer = (dirPath: string): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(dirPath, (err, files) => {
        err ? reject(err) : resolve(files.filter((i) => checkIsFile(i)));
      });
    } catch (e) {
      resolve([]);
    }
  });
};

export let getFileName = (path: string): string => {
  let index = path.lastIndexOf('/');
  if (index < 0 || path.length <= 0) return null;
  return path.substring(index + 1);
};
