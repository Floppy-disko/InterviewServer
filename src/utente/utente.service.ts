import { Injectable } from '@nestjs/common';
import { Utente, Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class UtenteService {

  constructor(private prisma: PrismaService) {}

  async create(utenteCreateInput: Prisma.UtenteCreateInput): Promise<Utente> {
    return this.prisma.utente.create({
      data: utenteCreateInput,
    });
  }

  findAll(params? : Prisma.UtenteFindManyArgs) : Promise<Utente[]> {
    return this.prisma.utente.findMany(params)
  }

  async findOne(utenteWhereUniqueInput: Prisma.UtenteWhereUniqueInput): Promise<Utente | null> {
    return this.prisma.utente.findUnique({
      where: utenteWhereUniqueInput,
    });
  }

  update(update: {where: Prisma.UtenteWhereUniqueInput, data: Prisma.UtenteUpdateInput}) : Promise<Utente> {
    return this.prisma.utente.update(update);
  }

  remove(id: number) {
    return `This action removes a #${id} utente`;
  }
}
