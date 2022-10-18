import { Injectable } from '@nestjs/common';
import { OUTPUT_IMAGE_PATH } from '../main';
import { readDirs } from '../utils/FileUtil';

@Injectable()
export class AppService {
  getAllFile(): Promise<Array<string>> {
    let dirPath = OUTPUT_IMAGE_PATH;
    if (!dirPath) return null;
    return readDirs(dirPath);
  }
}
