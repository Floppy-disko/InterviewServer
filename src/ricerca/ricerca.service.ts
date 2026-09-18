import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRicercaDto } from './dto/create-ricerca.dto.js';
import { UpdateRicercaDto } from './dto/update-ricerca.dto.js';
import { PrismaService } from '../prisma.service.js';
import { RicercaMapper } from './ricerca.mapper.js';
import { RicercaSelectParamsDto } from './dto/ricerca-select-params.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { RicercaFindAllParamsDto } from './ricerca.controller.js';

@Injectable()
export class RicercaService {
  constructor(
    private prisma: PrismaService,
    private mapper: RicercaMapper,
  ) {}

  async create(createRicercaDto: CreateRicercaDto) {
    const ricerca = await this.prisma.ricerca.create({
      data: this.mapper.createDtoToModel(createRicercaDto),
    });
    return this.mapper.modelToDto(ricerca);
  }

  async findAll(params: RicercaFindAllParamsDto) {
    const ricerche = await this.prisma.ricerca.findMany(
      this.mapper.allParamsDtoToModel(params),
    );
    return ricerche.map((ricerca) => this.mapper.modelToPartialDto(ricerca));
  }

  async findOne(id: number, params: RicercaSelectParamsDto) {
    const intervista = await this.prisma.ricerca.findUnique({
      where: { id },
      select: this.mapper.selectParamsDtoToModel(params),
    });
    if (!intervista) {
      throw new NotFoundException(`Ricerca ${id} not found`);
    }
    return this.mapper.modelToPartialDto(intervista);
  }

  async update(id: number, updateRicercaDto: UpdateRicercaDto) {
    try {
      const ricerca = await this.prisma.ricerca.update({
        where: { id },
        data: this.mapper.updateDtoToModel(updateRicercaDto),
      });
      return this.mapper.modelToDto(ricerca);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Ricerca ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const ricerca = await this.prisma.ricerca.delete({
        where: { id },
      });
      return this.mapper.modelToDto(ricerca);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Ricerca ${id} not found`);
      }
      throw error;
    }
  }
}
