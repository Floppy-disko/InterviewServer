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
import { IntersectionType } from '@nestjs/mapped-types';
import { RicercaService } from './ricerca.service.js';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { UpdateRicercaDto } from './dto/update-ricerca.dto.js';
import { RicercaSelectParamsDto } from './dto/ricerca-select-params.dto.js';
import { RicercaWhereParamsDto } from './dto/ricerca-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';
import { UtenteIdDto } from '../dto/utente-id.dto.js';

export class RicercaFindAllParamsDto extends IntersectionType(
  IntersectionType(RicercaSelectParamsDto, RicercaWhereParamsDto),
  PaginationParamsDto,
) {}

@Controller('ricerca')
export class RicercaController {
  constructor(private readonly ricercaService: RicercaService) {}

  @Post()
  create(@Body() createRicercaDto: CreateRicercaDto) {
    return this.ricercaService.create(createRicercaDto);
  }

  @Get()
  findAll(@Query() params: RicercaFindAllParamsDto) {
    return this.ricercaService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() params: RicercaSelectParamsDto) {
    return this.ricercaService.findOne(+id, params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRicercaDto: UpdateRicercaDto) {
    return this.ricercaService.update(+id, updateRicercaDto);
  }

  @Post(':id/selezionato')
  addSelezionato(@Param('id') id: string, @Body() body: UtenteIdDto) {
    return this.ricercaService.addSelezionato(+id, body.utenteId);
  }

  @Delete(':id/selezionato/:utenteId')
  removeSelezionato(
    @Param('id') id: string,
    @Param('utenteId') utenteId: string,
  ) {
    return this.ricercaService.removeSelezionato(+id, +utenteId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ricercaService.remove(+id);
  }
}
