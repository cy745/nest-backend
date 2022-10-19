import { Injectable } from '@nestjs/common';
import { readDirForOneLayer } from '../utils/FileUtil';
import { STATIC_ROOT } from '../main';

@Injectable()
export class AppService {
  getAllFile(): Promise<Array<string>> {
    let dirPath = STATIC_ROOT;
    if (!dirPath) return null;
    return readDirForOneLayer(dirPath);
  }
}
