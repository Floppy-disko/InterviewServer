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
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto | null>{
    const utente : Promise<Utente | null> = this.utenteService.findOne({id: id});
    /*
      converto Utente in CreateUtenteDto
    */
    const dto : Promise<CreateUtenteDto | null> = utente.then((utente) => {
      if (utente == null) return null
      const dto : CreateUtenteDto = {
        nome: utente.nome,
        cognome: utente.cognome,
        email: utente.email,
      };
      if (utente.ruolo != null) dto.ruolo=utente.ruolo
      return dto;
    });
    return dto;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUtenteDto: UpdateUtenteDto) : Promise<CreateUtenteDto>{
    const update = {where: {id: id}, data: updateUtenteDto};
    return this.utenteService.update(update);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto> {
    const utente = this.utenteService.remove({id});
    const dto = utente.then((utente) => {
      const dto : CreateUtenteDto = {
        nome: utente.nome,
        cognome: utente.cognome,
        email: utente.email,
      };
      if (utente.ruolo != null) dto.ruolo=utente.ruolo
      return dto;
    });
    return dto;
  }
}
