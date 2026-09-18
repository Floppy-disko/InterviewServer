import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IntervistaService } from './intervista.service.js';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { UpdateIntervistaDto } from './dto/update-intervista.dto.js';
import { IntervistaSelectParamsDto } from './dto/intervista-select-params.dto.js';
import { IntervistaWhereParamsDto } from './dto/Intervista-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';

export type IntervistaFindAllParamsDto = IntervistaSelectParamsDto & IntervistaWhereParamsDto & PaginationParamsDto

@Controller('intervista')
export class IntervistaController {
  constructor(private readonly intervistaService: IntervistaService) {}

  @Post()
  create(@Body() createDto: CreateIntervistaDto) {
    return this.intervistaService.create(createDto);
  }

  @Get()
  findAll(@Query() params: IntervistaFindAllParamsDto) {
    return this.intervistaService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query() params: IntervistaSelectParamsDto) {
    return this.intervistaService.findOne(id, params);
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
