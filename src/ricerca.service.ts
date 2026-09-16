import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Ricerca, Prisma } from "./generated/prisma/client";

@Injectable()
export class RicercaService {
  constructor(private prisma: PrismaService) {}

  async ricerca(ricercaWhereUniqueInput: Prisma.RicercaWhereUniqueInput): Promise<Ricerca | null> {
    return this.prisma.ricerca.findUnique({
      where: ricercaWhereUniqueInput,
    });
  }

  async ricerche(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RicercaWhereUniqueInput;
    where?: Prisma.RicercaWhereInput;
    orderBy?: Prisma.RicercaOrderByWithRelationInput;
  }): Promise<Ricerca[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ricerca.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRicerca(data: Prisma.RicercaCreateInput): Promise<Ricerca> {
    return this.prisma.ricerca.create({
      data,
    });
  }

  async updateRicerca(params: {
    where: Prisma.RicercaWhereUniqueInput;
    data: Prisma.RicercaUpdateInput;
  }): Promise<Ricerca> {
    const { where, data } = params;
    return this.prisma.ricerca.update({
      data,
      where,
    });
  }

  async deleteRicerca(where: Prisma.RicercaWhereUniqueInput): Promise<Ricerca> {
    return this.prisma.ricerca.delete({
      where,
    });
  }
}