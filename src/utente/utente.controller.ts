import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { CreateUtenteDto } from './dto/create-utente.dto';
import { UpdateUtenteDto } from './dto/update-utente.dto';
import { UtenteListParamsDto } from './dto/list-params.dto';
import { Utente } from "../generated/prisma/client"

@Controller('utente')
export class UtenteController {
  constructor(private readonly utenteService: UtenteService) {}

  /**
   * Coverti dal tipo utilizzato internatmente da prisma al dto usato dall'api
   * @param utente dati utente strutturati da Prisma
   * @returns dati utente utilizzati dall'api rest
   */
  modelToDto(utente: Utente) : CreateUtenteDto {
    const dto : CreateUtenteDto = {
      nome: utente.nome,
      cognome: utente.cognome,
      email: utente.email,
    };
    if (utente.ruolo != null) dto.ruolo=utente.ruolo
    return dto;
  }

  @Post()
  async create(@Body() createDto: CreateUtenteDto) : Promise<CreateUtenteDto>{
    //converto Promise<Utente> in Promise<CreateUtenteDto>
    const utente = this.utenteService.create(createDto);
    const dto = utente.then(this.modelToDto);
    return dto;
  }

  @Get()
  async findAll(params?: UtenteListParamsDto) : Promise<CreateUtenteDto[]>{
    const utente = this.utenteService.findAll(params);
    const dto = utente.then((utenti) => utenti.map(this.modelToDto));
    return dto;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto | null>{
    const utente : Promise<Utente | null> = this.utenteService.findOne({id: id});
    const dto : Promise<CreateUtenteDto | null> = utente.then((utente) => {
      if (utente == null) return null
      return this.modelToDto(utente);
    });
    return dto; 
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUtenteDto: UpdateUtenteDto) : Promise<CreateUtenteDto>{
    const update = {where: {id: id}, data: updateUtenteDto};
    const utente = this.utenteService.update(update);
    const dto = utente.then(this.modelToDto);
    return dto;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) : Promise<CreateUtenteDto> {
    const utente = this.utenteService.remove({id});
    const dto = utente.then(this.modelToDto);
    return dto;
  }
}
