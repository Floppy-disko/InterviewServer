import { Controller, Get, Post, Body, Query, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { CreateUtenteDto } from './dto/create-utente.dto';
import { UpdateUtenteDto } from './dto/update-utente.dto';
import { UtenteListParamsDto } from './dto/list-params.dto';
import { Utente } from "../generated/prisma/client"
import { ValidationPipe } from '@nestjs/common';

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  async create(@Body() createDto: CreateUtenteDto) : Promise<CreateUtenteDto>{
    return this.utenteService.create(createDto);
  }

  @Get()
  async findAll(@Query(ValidationPipe) params: UtenteListParamsDto) : Promise<CreateUtenteDto[]>{
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto | null>{
    return this.utenteService.findOne(id); 
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() update: UpdateUtenteDto) : Promise<CreateUtenteDto>{
    return this.utenteService.update(id, update);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto> {
    return this.utenteService.remove(id);
  }
}
