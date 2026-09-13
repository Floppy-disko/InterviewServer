import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { CreateUtenteDto } from './dto/create-utente.dto';
import { UpdateUtenteDto } from './dto/update-utente.dto';
import { UtenteListParamsDto } from './dto/list-params.dto';
import { Utente } from "../generated/prisma/client"

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) { }

  @Post()
  create(@Body() createDto: CreateUtenteDto): Promise<CreateUtenteDto> {
    return this.utenteService.create(createDto);
  }

  @Get()
  findAll(@Query() params: UtenteListParamsDto): Promise<CreateUtenteDto[]> {
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CreateUtenteDto | null> {
    return this.utenteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() update: UpdateUtenteDto): Promise<CreateUtenteDto> {
    return this.utenteService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<CreateUtenteDto> {
    return this.utenteService.remove(id);
  }
}
