import { Controller, Get } from '@nestjs/common';

@Controller('static')
export class StaticController {
  @Get('/**')
  getStatic(): string {
    return 'File Not Exist.';
  }
}
