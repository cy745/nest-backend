import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7861);
})();

export const OUTPUT_IMAGE_PATH =
  'E:\\Program Files (x86)\\stable-diffusion-webui\\outputs\\txt2img-images';

export const VUE_DIST_PATH = 'C:\\Users\\12483\\WebstormProjects\\img\\dist';
