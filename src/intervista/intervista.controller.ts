import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntervistaService } from './intervista.service.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { UpdateIntervistaDto } from './dto/update-intervista.dto.js';

@Controller('intervista')
export class IntervistaController {
  constructor(private readonly intervistaService: IntervistaService) {}

  @Post()
  create(@Body() createIntervistaDto: CreateIntervistaDto) {
    return this.intervistaService.create(createIntervistaDto);
  }

  @Get()
  findAll() {
    return this.intervistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intervistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntervistaDto: UpdateIntervistaDto) {
    return this.intervistaService.update(+id, updateIntervistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intervistaService.remove(+id);
  }
}
