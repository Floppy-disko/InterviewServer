import { Injectable } from '@nestjs/common';
import { Utente, Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma.service.js";
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteListParamsDto } from './dto/list-params.dto.js';

//tipo accettato da this.prisma.utente.create
type CreateModel = Prisma.Args<
  PrismaService['utente'],
  'create'
>['data'];

type ListParamsModel = Prisma.Args<
  PrismaService['utente'],
  'findMany'
>

@Injectable()
export class UtenteService {

  constructor(private prisma: PrismaService) { }

  /**
   * Coverti dal tipo utilizzato internatmente da prisma al dto usato dall'api
   * @param utente dati utente strutturati da Prisma
   * @returns dati utente nel formato esposto dall'api rest
   */
  modelToDto(utente: Utente): CreateUtenteDto {
    const { ruolo, ...fields } = utente;
    const dto: CreateUtenteDto = {
      ...fields
    };
    //quando nel db la row ruolo è vuota ruolo risulta null nel model, in quel caso non voglio ruolo nel dto
    if (utente.ruolo !== null) dto.ruolo = utente.ruolo
    return dto;
  }

  createDtoToModel(dto: CreateUtenteDto): CreateModel {
    //per adesso non sono necessarie particolari conversioni tra model e dto
    return dto;
  }

  listParamsDtoToModel(params: UtenteListParamsDto): ListParamsModel {
    return params
  }

  async create(data: CreateUtenteDto): Promise<CreateUtenteDto> {
    const utente = this.prisma.utente.create({
      data: this.createDtoToModel(data)
    });
    return utente.then(this.modelToDto);
  }

  async findAll(params: UtenteListParamsDto): Promise<CreateUtenteDto[]> {
    const utenti = this.prisma.utente.findMany(this.listParamsDtoToModel(params))
    return utenti.then((utenti) => utenti.map(this.modelToDto));
  }

  async findOne(id: number): Promise<CreateUtenteDto | null> {
    const utente = this.prisma.utente.findUnique({
      where: {id}
    });
    const dto = utente.then((utente) => {
      if (utente === null) return null
      return this.modelToDto(utente);
    });
    return dto;
  }

  async update(id: number, update: UpdateUtenteDto): Promise<CreateUtenteDto> {
    const utente = this.prisma.utente.update({where: {id}, data: update});
    return utente.then(this.modelToDto);
  }

  async remove(id: number): Promise<CreateUtenteDto> {
    const utente = this.prisma.utente.delete({
      where: {id}
    })
    return utente.then(this.modelToDto);
  }
}
