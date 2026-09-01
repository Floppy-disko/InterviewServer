import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { CreateUtenteDto } from './dto/create-utente.dto';
import { UpdateUtenteDto } from './dto/update-utente.dto';
import { UtenteListParamsDto } from './dto/list-params.dto';
import { Utente } from "../generated/prisma/client"

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  @Post()
  async create(@Body() createDto: CreateUtenteDto) : Promise<CreateUtenteDto>{
    /* per adesso dto e prisma objects hanno la stessa struttura,
     quindi basta passare e ritornare senza coversioni,
     ma non vale in generale*/
    return this.utenteService.create(createDto);
  }

  @Get()
  async findAll(params?: UtenteListParamsDto) : Promise<CreateUtenteDto[]>{
    return this.utenteService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<CreateUtenteDto | null>{
    const utente : Promise<Utente | null> = this.utenteService.findOne({id: id});
    /*
      come detto prima adesso il dto di utente è compatibile con la classe usata per il modello 
      (non uguale in questo caso), ma in generale può essere non compatibile e richiedere
      una conversione
    */
    const dto : Promise<CreateUtenteDto | null> = utente;
    return dto;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUtenteDto: UpdateUtenteDto) : Promise<CreateUtenteDto>{
    return this.utenteService.update(id, updateUtenteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.utenteService.remove(+id);
  }
}
