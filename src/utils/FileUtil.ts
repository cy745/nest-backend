import * as fs from 'fs';

/**
 * 获取指定目录下的所有文件名的方法
 * @param dirPath 指定目录
 */
export let readDirs = (dirPath: string): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      err ? reject(err) : resolve(files);
    });
  });
};

export let getFileName = (path: string): string => {
  let index = path.lastIndexOf('/');
  if (index < 0 || path.length <= 0) return null;
  return path.substring(index + 1);
};
