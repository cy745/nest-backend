import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDirs(): Promise<Array<string>> {
    return this.appService.getAllFile();
  }
}
