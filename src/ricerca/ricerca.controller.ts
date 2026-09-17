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
import { RicercaService } from './ricerca.service.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { UpdateRicercaDto } from './dto/update-ricerca.dto.js';
import { RicercaListParamsDto } from './dto/ricerca-list-params.dto.js';

@Controller('ricerca')
export class RicercaController {
  constructor(private readonly ricercaService: RicercaService) {}

  @Post()
  create(@Body() createRicercaDto: CreateRicercaDto) {
    return this.ricercaService.create(createRicercaDto);
  }

  @Get()
  findAll(@Query() params: RicercaListParamsDto) {
    return this.ricercaService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ricercaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRicercaDto: UpdateRicercaDto) {
    return this.ricercaService.update(+id, updateRicercaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ricercaService.remove(+id);
  }
}
