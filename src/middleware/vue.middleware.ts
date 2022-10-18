import { StaticMiddleware } from './static.middleware';
import { Injectable } from '@nestjs/common';
import { VUE_DIST_PATH } from '../main';

@Injectable()
export class VueMiddleware extends StaticMiddleware {
  override sourcesPath = VUE_DIST_PATH;
}
