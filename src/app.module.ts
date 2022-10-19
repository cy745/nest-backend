import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { STATIC_ROOT } from './main';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: STATIC_ROOT,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
