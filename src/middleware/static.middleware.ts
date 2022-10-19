import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getFileName, readDirForOneLayer } from '../utils/FileUtil';
import { OUTPUT_IMAGE_PATH } from '../config';

const mime = require('mime');

@Injectable()
export abstract class StaticMiddleware implements NestMiddleware {
  declare readonly sourcesPath: string;

  private files: Array<string> = [];
  private lastFetchTime: number = 0;

  async use(req: Request, res: Response, next: NextFunction) {
    let target = decodeURI(getFileName(req.url));

    if (!target) {
      next();
      return;
    }

    if (this.lastFetchTime + 5000 < new Date().getTime()) {
      this.files = await readDirForOneLayer(this.sourcesPath);
      this.lastFetchTime = new Date().getTime();
    }
    if (this.files.length <= 0) {
      next();
      return;
    }

    let result: string | undefined;
    for (let image of this.files) {
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
    res.setHeader('Cache-Control', 'public');
    return res.sendFile(result);
  }
}

@Injectable()
export class StaticFileMiddleware extends StaticMiddleware {
  override sourcesPath = OUTPUT_IMAGE_PATH;
}
