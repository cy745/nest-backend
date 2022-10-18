import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { StaticMiddleware } from './middleware/static.middleware';
import { StaticController } from './controller/static.controller';

@Module({
  imports: [],
  controllers: [AppController, StaticController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(StaticMiddleware).forRoutes(StaticController);
  }
}
