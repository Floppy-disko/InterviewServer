import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { UpdateIntervistaDto } from './dto/update-intervista.dto';
import { ResponseIntervistaDto } from './dto/response-intervista.dto';
import { PrismaService } from '../prisma.service';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto';
import { IntervistaMapper } from './intervista.mapper';
import { Intervista, Prisma } from '../generated/prisma/client';

@Injectable()
export class IntervistaService {

  constructor(
    private prisma: PrismaService,
    private mapper: IntervistaMapper,
  ) { }

  async busyUtenti(
    utentiIds: number[],
    inizio: Date,
    fine: Date,
  ): Promise<number[]> {
    const overlappingInterviste = await this.prisma.intervista.findMany({
      where: {
        OR: [
          {
            candidatoId: { in: utentiIds },
            inizio: { lt: fine },
            fine: { gt: inizio },
          },
          {
            intervistatori: {
              some: {
                id: { in: utentiIds },
              },
            },
            inizio: { lt: fine },
            fine: { gt: inizio },
          },
        ],
      },
      select: {
        candidatoId: true,
        intervistatori: {
          select: { id: true },
        },
      },
    });

    return [
      // uso Set per evitare duplicati, poi filtro solo gli id che erano nella lista di input
      ...new Set([
        ...overlappingInterviste.map((intervista) => intervista.candidatoId),
        ...overlappingInterviste.flatMap((intervista) =>
          intervista.intervistatori.map((intervistatore) => intervistatore.id),
        ),
      ]),
    ].filter((id) => utentiIds.includes(id));
  }

  async missingUtenti(utentiIds: number[]): Promise<number[]> {
    const foundUtenti = await this.prisma.utente.findMany({
      where: { id: { in: utentiIds } },
      select: { id: true },
    });

    const foundUtentiIds = new Set(foundUtenti.map((utente) => utente.id));
    return utentiIds.filter((id) => !foundUtentiIds.has(id));
  }

  async create(data: CreateIntervistaDto): Promise<ResponseIntervistaDto> {

    //controlla che la ricerca esista
    const ricerca = await this.prisma.ricerca.findUnique({
      where: { id: data.ricerca },
    });
    if (!ricerca) {
      throw new NotFoundException(`Ricerca ${data.ricerca} not found`);
    }

    //controlla che ci sia almeno un intervistatore
    if (data.intervistatori.length === 0) {
      throw new BadRequestException(
        'At least one intervistatore is required',
      );
    }

    if (new Date(data.inizio) >= new Date(data.fine)) {
      throw new BadRequestException('inizio must be before fine');
    }

    const utentiIds = [...new Set([data.candidato, ...data.intervistatori])];

    const missingUtentiIds = await this.missingUtenti(utentiIds);
    if (missingUtentiIds.length > 0) {
      throw new NotFoundException(
        `Utenti not in database: ${missingUtentiIds.join(', ')}`,
      );
    }

    const busyUtentiIds = await this.busyUtenti(
      utentiIds,
      data.inizio,
      data.fine,
    );
    if (busyUtentiIds.length > 0) {
      throw new BadRequestException(
        `Utenti already busy during the selected time: ${busyUtentiIds.join(', ')}`,
      );
    }

    const intervista = await this.prisma.intervista.create({
      data: this.mapper.createDtoToModel(data),
      include: {
        candidato: true,
        intervistatori: true,
        ricerca: true,
      }
    });
    
    return this.mapper.modelToDto(intervista);
  }

  async findAll(params: IntervistaListParamsDto): Promise<Partial<ResponseIntervistaDto>[]> {
    const utenti: Partial<Intervista>[] = await this.prisma.intervista.findMany(
          this.mapper.listParamsDtoToModel(params),
        );
        return utenti.map((utente) => this.mapper.modelToPartialDto(utente));
  }

  async findOne(id: number) {
    return `This action returns a #${id} intervista`;
  }

  async update(id: number, updateIntervistaDto: UpdateIntervistaDto) {
    return `This action updates a #${id} intervista`;
  }

  async remove(id: number) {
    return `This action removes a #${id} intervista`;
  }
}
