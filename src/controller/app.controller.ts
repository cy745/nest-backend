import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDirs(): Promise<Array<string>> {
    return this.appService.getAllFile();
  }

  @Get(['/**', '/assets/**'])
  getStatic(): string {
    return 'File Not Exist.';
  }
}
