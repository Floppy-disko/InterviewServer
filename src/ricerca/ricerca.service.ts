import { Injectable } from '@nestjs/common';
import { CreateRicercaDto } from './dto/create-ricerca.dto';
import { UpdateRicercaDto } from './dto/update-ricerca.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RicercaService {

  constructor(private prisma: PrismaService) {}

  create(createRicercaDto: CreateRicercaDto) {
    return this.prisma.ricerca.create({
      data: createRicercaDto,
    });
  }

  findAll() {
    return `This action returns all ricerca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ricerca`;
  }

  update(id: number, updateRicercaDto: UpdateRicercaDto) {
    return `This action updates a #${id} ricerca`;
  }

  remove(id: number) {
    return `This action removes a #${id} ricerca`;
  }
}
