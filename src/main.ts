import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(7861);
})();

export const STATIC_ROOT = join(__dirname, 'static');
export const OUTPUT_IMAGE_PATH = '';
