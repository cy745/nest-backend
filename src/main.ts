import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
})();

export const OUTPUT_IMAGE_PATH =
  'E:\\Program Files (x86)\\stable-diffusion-webui\\outputs\\txt2img-images';
