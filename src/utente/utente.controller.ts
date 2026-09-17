import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtenteService } from './utente.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  create(@Body() createUtenteDto: CreateUtenteDto) {
    return this.utenteService.create(createUtenteDto);
  }

  @Get()
  findAll() {
    return this.utenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtenteDto: UpdateUtenteDto) {
    return this.utenteService.update(+id, updateUtenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utenteService.remove(+id);
  }
}
