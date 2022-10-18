import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OUTPUT_IMAGE_PATH } from '../main';
import { getFileName, readDirs } from '../utils/FileUtil';

const mime = require('mime');
let images: Array<string> = [];
let lastFetchTime: number = 0;

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let target = decodeURI(getFileName(req.url));
    if (!target) {
      next();
      return;
    }

    console.log(lastFetchTime, new Date().getTime());
    if (lastFetchTime + 5000 < new Date().getTime()) {
      console.log('fetch new list');
      images = await readDirs(OUTPUT_IMAGE_PATH);
      lastFetchTime = new Date().getTime();
    }
    if (images.length <= 0) {
      next();
      return;
    }

    let result: string | undefined;
    for (let image of images) {
      if (target === image) {
        result = `${OUTPUT_IMAGE_PATH}\\${target}`;
        break;
      }
    }
    if (!result) {
      next();
      return;
    }

    res.setHeader('Content-Type', mime.getType(result));
    return res.sendFile(result);
  }
}
