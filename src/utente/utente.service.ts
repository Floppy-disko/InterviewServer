import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteSelectParamsDto } from './dto/utente-select-params.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UtenteMapper } from './utente.mapper.js';
import { UtenteFindAllParamsDto } from './utente.controller.js';
import { DeepPartial } from './utente.mapper.js';
import { utenteSelect } from './utente.select.js';
import { AppMapper } from '../app.mapper.js';

@Injectable()
export class UtenteService {
  constructor(
    private prisma: PrismaService,
    private mapper: UtenteMapper,
    private appMapper: AppMapper,
  ) {}

  async create(data: CreateUtenteDto): Promise<ResponseUtenteDto> {
    try {
      const utente = await this.prisma.utente.create({
        data: this.mapper.createDtoToModel(data),
        select: utenteSelect,
      });
      return this.appMapper.mapUtente(utente) as ResponseUtenteDto;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new NotFoundException(
          `Utente with email ${data.email} already exists`,
        );
      }

      throw error;
    }
  }

  async findAll(
    params: UtenteFindAllParamsDto,
  ): Promise<DeepPartial<ResponseUtenteDto>[]> {
    const utenti = await this.prisma.utente.findMany(
      this.mapper.allParamsDtoToModel(params),
    );
    return utenti.map((utente) => this.appMapper.mapUtente(utente));
  }

  async findOne(
    id: number,
    params: UtenteSelectParamsDto,
  ): Promise<DeepPartial<ResponseUtenteDto>> {
    const utente = await this.prisma.utente.findUnique({
      where: { id },
      select: this.mapper.selectParamsDtoToModel(params),
    });
    if (!utente) {
      throw new NotFoundException(`Utente ${id} not found`);
    }
    return this.appMapper.mapUtente(utente);
  }

  async update(
    id: number,
    update: UpdateUtenteDto,
  ): Promise<ResponseUtenteDto> {
    try {
      const utente = await this.prisma.utente.update({
        where: { id },
        data: this.mapper.updateDtoToModel(update),
        select: utenteSelect,
      });

      return this.appMapper.mapUtente(utente) as ResponseUtenteDto;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Utente ${id} not found`);
      }

      throw error;
    }
  }

  async remove(id: number): Promise<ResponseUtenteDto> {
    try {
      const utente = await this.prisma.utente.findUnique({ where: { id } });
      if (!utente) {
        throw new NotFoundException(`Utente ${id} not found`);
      }

      const deletedUtente = await this.prisma.utente.delete({
        where: { id },
        select: utenteSelect,
      });
      return this.appMapper.mapUtente(deletedUtente) as ResponseUtenteDto;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Utente ${id} not found`);
      }

      throw error;
    }
  }
}
