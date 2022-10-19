import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { StaticFileMiddleware } from './middleware/static.middleware';
import { StaticController } from './controller/static.controller';
import { STATIC_ROOT } from './config';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: STATIC_ROOT })],
  controllers: [AppController, StaticController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(StaticFileMiddleware).forRoutes(StaticController);
  }
}
