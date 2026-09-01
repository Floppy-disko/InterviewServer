import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { Intervista, Prisma } from "./generated/prisma/client.js";

@Injectable()
export class IntervistaService {
  constructor(private prisma: PrismaService) {}

  async intervista(intervistaWhereUniqueInput: Prisma.IntervistaWhereUniqueInput): Promise<Intervista | null> {
    return this.prisma.intervista.findUnique({
      where: intervistaWhereUniqueInput,
    });
  }

  async interviste(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IntervistaWhereUniqueInput;
    where?: Prisma.IntervistaWhereInput;
    orderBy?: Prisma.IntervistaOrderByWithRelationInput;
  }): Promise<Intervista[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.intervista.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createIntervista(data: Prisma.IntervistaCreateInput): Promise<Intervista> {
    return this.prisma.intervista.create({
      data,
    });
  }

  async updateIntervista(params: {
    where: Prisma.IntervistaWhereUniqueInput;
    data: Prisma.IntervistaUpdateInput;
  }): Promise<Intervista> {
    const { data, where } = params;
    return this.prisma.intervista.update({
      data,
      where,
    });
  }

  async deleteIntervista(where: Prisma.IntervistaWhereUniqueInput): Promise<Intervista> {
    return this.prisma.intervista.delete({
      where,
    });
  }
}