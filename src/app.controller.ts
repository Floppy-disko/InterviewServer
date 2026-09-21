import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('database')
  clearDatabase() {
    return this.appService.clearDatabase();
  }

  @Get('database')
  getDatabaseCounts() {
    return this.appService.getDatabaseCounts();
  }
}
