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
import { UtenteService } from './utente.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteListParamsDto } from './dto/utente-list-params.dto.js';
import { Utente } from '../generated/prisma/client.js';

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  create(@Body() createDto: CreateUtenteDto): Promise<ResponseUtenteDto> {
    return this.utenteService.create(createDto);
  }

  @Get()
  findAll(
    @Query() params: UtenteListParamsDto,
  ): Promise<Partial<ResponseUtenteDto>[]> {
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseUtenteDto | null> {
    return this.utenteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() update: UpdateUtenteDto,
  ): Promise<ResponseUtenteDto> {
    return this.utenteService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<ResponseUtenteDto> {
    return this.utenteService.remove(id);
  }
}
