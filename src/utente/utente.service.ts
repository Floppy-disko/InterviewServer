import { Injectable } from '@nestjs/common';
import { Utente, Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class UtenteService {

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UtenteCreateInput): Promise<Utente> {
    return this.prisma.utente.create({
      data
    });
  }

  async findAll(params? : Prisma.UtenteFindManyArgs) : Promise<Utente[]> {
    return this.prisma.utente.findMany(params)
  }

  async findOne(where: Prisma.UtenteWhereUniqueInput): Promise<Utente | null> {
    return this.prisma.utente.findUnique({
      where
    });
  }

  async update(update: {where: Prisma.UtenteWhereUniqueInput, data: Prisma.UtenteUpdateInput}) : Promise<Utente> {
    return this.prisma.utente.update(update);
  }

  async remove(where: Prisma.UtenteWhereUniqueInput): Promise<Utente> {
    return this.prisma.utente.delete({
      where
    })
  }
}
