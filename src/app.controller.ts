import { Controller, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy', type: String })
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('database')
  @ApiOperation({ summary: 'Clear all database records' })
  @ApiResponse({ status: 200, description: 'Database cleared' })
  clearDatabase() {
    return this.appService.clearDatabase();
  }

  @Get('database')
  @ApiOperation({ summary: 'Get entity counts in database' })
  @ApiResponse({ status: 200, description: 'Record counts returned' })
  getDatabaseCounts() {
    return this.appService.getDatabaseCounts();
  }
}
