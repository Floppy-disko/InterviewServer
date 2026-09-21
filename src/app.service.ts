import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async clearDatabase() {
    const [interviste, ricerche, utenti] = await this.prisma.$transaction([
      this.prisma.intervista.deleteMany(),
      this.prisma.ricerca.deleteMany(),
      this.prisma.utente.deleteMany(),
    ]);

    return {
      message: 'Database cleared',
      deleted: {
        interviste: interviste.count,
        ricerche: ricerche.count,
        utenti: utenti.count,
      },
    };
  }

  async getDatabaseCounts() {
    const [interviste, ricerche, utenti] = await Promise.all([
      this.prisma.intervista.count(),
      this.prisma.ricerca.count(),
      this.prisma.utente.count(),
    ]);

    return { interviste, ricerche, utenti };
  }
}
