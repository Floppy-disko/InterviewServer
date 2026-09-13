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
    const dto: CreateUtenteDto = {
      nome: utente.nome,
      cognome: utente.cognome,
      email: utente.email,
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
    const { nome, cognome, email, ruolo, exclude, ...rest } = params;
    let a: Prisma.UtenteWhereInput;
    let b: Prisma.StringFilter<"Utente">;
    const dto : ListParamsModel = {
      ...rest,
      select: {
        nome: !exclude?.includes('nome'),
        cognome: !exclude?.includes('cognome'),
        email: !exclude?.includes('email'),
        ruolo: !exclude?.includes('ruolo') 
      },
      where: {
        //and a livello dei diversi parametri, or a livello dei valori di un singolo parametro
        AND: [
          {nome: nome ? { in: nome } : undefined},
          {cognome: cognome ? { in: cognome } : undefined},
          {email: email ? { in: email } : undefined},
          {ruolo: ruolo ? { in: ruolo } : undefined}
        ]
      },
    };
    return dto;
  }

  async create(data: CreateUtenteDto): Promise<CreateUtenteDto> {
    const utente = await this.prisma.utente.create({
      data: this.createDtoToModel(data)
    });
    return this.modelToDto(utente);
  }

  async findAll(params: UtenteListParamsDto): Promise<CreateUtenteDto[]> {
    const utenti = await this.prisma.utente.findMany(this.listParamsDtoToModel(params))
    return utenti.map(this.modelToDto);
  }

  async findOne(id: number): Promise<CreateUtenteDto | null> {
    const utente = await this.prisma.utente.findUnique({
      where: { id }
    });
    return utente!==null ? this.modelToDto(utente) : null;
  }

  async update(id: number, update: UpdateUtenteDto): Promise<CreateUtenteDto> {
    const utente = await this.prisma.utente.update({ where: { id }, data: update });
    return this.modelToDto(utente);
  }

  async remove(id: number): Promise<CreateUtenteDto> {
    const utente = await this.prisma.utente.delete({
      where: { id }
    });
    return this.modelToDto(utente);
  }
}
