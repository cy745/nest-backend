import { Injectable } from '@nestjs/common';
import { readDirForOneLayer } from '../utils/FileUtil';
import { OUTPUT_IMAGE_PATH } from '../config';

@Injectable()
export class AppService {
  getAllFile(): Promise<Array<string>> {
    let dirPath = OUTPUT_IMAGE_PATH;
    if (!dirPath) return null;
    return readDirForOneLayer(dirPath);
  }
}
