import { Injectable } from '@nestjs/common';
import { Utente } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma.service.js";
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteListParamsDto } from './dto/utente-list-params.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UtenteMapper } from './utente.mapper.js';

@Injectable()
export class UtenteService {

  constructor(
    private prisma: PrismaService,
    private mapper: UtenteMapper,
  ) { }

  async create(data: CreateUtenteDto): Promise<ResponseUtenteDto> {
    const utente = await this.prisma.utente.create({
      data: this.mapper.createDtoToModel(data)
    });
    return this.mapper.modelToDto(utente);
  }

  async findAll(params: UtenteListParamsDto): Promise<ResponseUtenteDto[]> {
    const utenti = await this.prisma.utente.findMany(
      this.mapper.listParamsDtoToModel(params),
    );
    return utenti.map((utente) => this.mapper.modelToDto(utente));
  }

  async findOne(id: number): Promise<ResponseUtenteDto | null> {
    const utente = await this.prisma.utente.findUnique({
      where: { id }
    });
    return utente !== null ? this.mapper.modelToDto(utente) : null;
  }

  async update(id: number, update: UpdateUtenteDto): Promise<ResponseUtenteDto> {
    const utente = await this.prisma.utente.update({ where: { id }, data: update });
    return this.mapper.modelToDto(utente);
  }

  async remove(id: number): Promise<ResponseUtenteDto> {
    const utente = await this.prisma.utente.delete({
      where: { id }
    });
    return this.mapper.modelToDto(utente);
  }
}
