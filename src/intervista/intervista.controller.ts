import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IntervistaService } from './intervista.service';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { UpdateIntervistaDto } from './dto/update-intervista.dto';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto';

@Controller('intervista')
export class IntervistaController {
  constructor(private readonly intervistaService: IntervistaService) {}

  @Post()
  create(@Body() createDto: CreateIntervistaDto) {
    return this.intervistaService.create(createDto);
  }

  @Get()
  findAll(@Query() params: IntervistaListParamsDto) {
    return this.intervistaService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.intervistaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() update: UpdateIntervistaDto) {
    return this.intervistaService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.intervistaService.remove(id);
  }
}
