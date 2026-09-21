import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IntersectionType } from '@nestjs/mapped-types';
import { UtenteService } from './utente.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteSelectParamsDto } from './dto/utente-select-params.dto.js';
import { UtenteWhereParamsDto } from './dto/utente-where-params.dto.js';
import { PaginationParamsDto } from '../dto/pagination-params.dto.js';

//classe che combina tutti i tipi di query paramter
//serve che sia una classe così che class-validator sappia il tipo a runtime
export class UtenteFindAllParamsDto extends IntersectionType(
  IntersectionType(UtenteSelectParamsDto, UtenteWhereParamsDto),
  PaginationParamsDto,
) {}

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  create(@Body() createDto: CreateUtenteDto) {
    return this.utenteService.create(createDto);
  }

  @Get()
  findAll(
    @Query() params: UtenteFindAllParamsDto,
  ) {
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Query() params: UtenteSelectParamsDto,
  ) {
    return this.utenteService.findOne(id, params);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() update: UpdateUtenteDto,
  ) {
    return this.utenteService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.utenteService.remove(id);
  }
}
