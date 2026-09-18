import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Utente } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma.service.js';
import { CreateUtenteDto } from './dto/create-utente.dto.js';
import { UpdateUtenteDto } from './dto/update-utente.dto.js';
import { UtenteSelectParamsDto } from './dto/utente-select-params.dto.js';
import { ResponseUtenteDto } from './dto/response-utente.dto.js';
import { UtenteMapper } from './utente.mapper.js';
import { UtenteFindAllParamsDto } from './utente.controller.js';

@Injectable()
export class UtenteService {
  constructor(
    private prisma: PrismaService,
    private mapper: UtenteMapper,
  ) {}

  async create(data: CreateUtenteDto): Promise<ResponseUtenteDto> {
    try {
      const utente = await this.prisma.utente.create({
        data: this.mapper.createDtoToModel(data),
      });
      return this.mapper.modelToDto(utente);
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
  ): Promise<Partial<ResponseUtenteDto>[]> {
    const utenti: Partial<Utente>[] = await this.prisma.utente.findMany(
      this.mapper.allParamsDtoToModel(params),
    );
    return utenti.map((utente) => this.mapper.modelToPartialDto(utente));
  }

  async findOne(
    id: number,
    params: UtenteSelectParamsDto,
  ): Promise<Partial<ResponseUtenteDto>> {
    const utente = await this.prisma.utente.findUnique({
      where: { id },
      select: this.mapper.selectParamsDtoToModel(params),
    });
    if (!utente) {
      throw new NotFoundException(`Utente ${id} not found`);
    }
    return this.mapper.modelToPartialDto(utente);
  }

  async update(
    id: number,
    update: UpdateUtenteDto,
  ): Promise<ResponseUtenteDto> {
    try {
      const utente = await this.prisma.utente.update({
        where: { id },
        data: this.mapper.updateDtoToModel(update),
      });

      return this.mapper.modelToDto(utente);
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
      const utente = await this.prisma.utente.delete({
        where: { id },
      });
      return this.mapper.modelToDto(utente);
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
