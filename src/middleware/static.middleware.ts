import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getFileName, readDirs } from '../utils/FileUtil';
import { OUTPUT_IMAGE_PATH } from '../main';

const mime = require('mime');
let images: Array<string> = [];
let lastFetchTime: number = 0;

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  protected readonly sourcesPath: string = OUTPUT_IMAGE_PATH;

  async use(req: Request, res: Response, next: NextFunction) {
    let target = decodeURI(getFileName(req.url));

    if (!target) {
      next();
      return;
    }

    if (lastFetchTime + 5000 < new Date().getTime()) {
      images = await readDirs(this.sourcesPath);
      lastFetchTime = new Date().getTime();
    }
    if (images.length <= 0) {
      next();
      return;
    }

    let result: string | undefined;
    for (let image of images) {
      if (target === image) {
        result = `${this.sourcesPath}\\${target}`;
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
