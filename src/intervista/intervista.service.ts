import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIntervistaDto } from './dto/create-intervista.dto.js';
import { UpdateIntervistaDto } from './dto/update-intervista.dto.js';
import { ResponseIntervistaDto } from './dto/response-intervista.dto.js';
import { PrismaService } from '../prisma.service.js';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto.js';
import { IntervistaMapper } from './intervista.mapper.js';
import { Prisma } from '../generated/prisma/client.js';
import { intervistaSelect } from './intervista.select.js';

@Injectable()
export class IntervistaService {
  constructor(
    private prisma: PrismaService,
    private mapper: IntervistaMapper,
  ) {}

  /**
   * Verifica se uno o più utenti sono già occupati durante l'intervallo di tempo selezionato.
   * @param utentiIds
   *  lista di id degli utenti da verificare
   * @param inizio
   *  data di inizio dell'intervallo di tempo da verificare
   * @param fine
   *  data di fine dell'intervallo di tempo da verificare
   * @param excludeIntervistaId
   *  intervista da non considerare per le verifiche (utile per l'update)
   * @returns
   *  lista di id degli utenti che sono già occupati durante l'intervallo di tempo selezionato
   */
  private async busyUtenti(
    utentiIds: number[],
    inizio: Date,
    fine: Date,
    excludeIntervistaId?: number,
  ): Promise<number[]> {
    const overlappingInterviste = await this.prisma.intervista.findMany({
      where: {
        ...(excludeIntervistaId === undefined
          ? {}
          : { id: { not: excludeIntervistaId } }),
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

  /**
   * Verifica se uno o più utenti mancano nel database.
   * @param utentiIds
   *  lista di id degli utenti da verificare
   * @returns
   *  lista di id degli utenti che non esistono nel database
   */
  private async missingUtenti(utentiIds: number[]): Promise<number[]> {
    const foundUtenti = await this.prisma.utente.findMany({
      where: { id: { in: utentiIds } },
      select: { id: true },
    });

    const foundUtentiIds = new Set(foundUtenti.map((utente) => utente.id));
    return utentiIds.filter((id) => !foundUtentiIds.has(id));
  }

  /**
   * Tutti i controlli per verificare che un intervista sia possibile/valida.
   * Controlla che:
   * - la ricerca esista
   * - ci sia almeno un intervistatore
   * - candidato sia diverso da tutti gli intervistatori
   * - inizio < fine
   * - tutti gli utenti esistano
   * - tutti gli utenti siano liberi durante l'intervallo di tempo selezionato
   * @param data
   *  dati di interesse per le verifiche
   * @param excludeIntervistaId
   *  intervista da non considerare per le verifiche (utile per l'update,
   *  per non considerare l'intervista su cui sto facendo l'update)
   * @throws BadRequestException se la richiesta non è possibile
   * @throws NotFoundException se la ricerca o gli utenti non esistono
   */
  private async validateIntervista(
    data: Pick<
      CreateIntervistaDto,
      'candidato' | 'intervistatori' | 'ricerca' | 'inizio' | 'fine'
    >,
    excludeIntervistaId?: number,
  ): Promise<void> {
    const ricerca = await this.prisma.ricerca.findUnique({
      where: { id: data.ricerca },
    });
    if (!ricerca) {
      throw new NotFoundException(`Ricerca ${data.ricerca} not found`);
    }

    //controlla che ci sia almeno un intervistatore
    if (data.intervistatori.length === 0) {
      throw new BadRequestException('At least one intervistatore is required');
    }

    //controlla che candidato sia diverso da tutti gli intervistatori
    if (data.intervistatori.includes(data.candidato)) {
      throw new BadRequestException(
        'Candidato must be different from all intervistatori',
      );
    }

    if (data.inizio >= data.fine) {
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
      excludeIntervistaId,
    );
    if (busyUtentiIds.length > 0) {
      throw new BadRequestException(
        `Utenti already busy during the selected time: ${busyUtentiIds.join(', ')}`,
      );
    }
  }

  async create(data: CreateIntervistaDto): Promise<ResponseIntervistaDto> {
    await this.validateIntervista(data);

    const intervista = await this.prisma.intervista.create({
      data: this.mapper.createDtoToModel(data),
      select: intervistaSelect,
    });

    return this.mapper.modelToDto(intervista);
  }

  async findAll(
    params: IntervistaListParamsDto,
  ): Promise<Partial<ResponseIntervistaDto>[]> {
    const interviste = await this.prisma.intervista.findMany(
      this.mapper.listParamsDtoToModel(params),
    );
    return interviste.map((intervista) =>
      this.mapper.modelToPartialDto(intervista),
    );
  }

  async findOne(id: number) {
    const intervista = await this.prisma.intervista.findUnique({
      where: { id },
      select: intervistaSelect,
    });
    if (!intervista) {
      throw new NotFoundException(`Intervista ${id} not found`);
    }
    return this.mapper.modelToDto(intervista);
  }

  async update(id: number, updateIntervistaDto: UpdateIntervistaDto) {
    const intervista = await this.prisma.intervista.findUnique({
      where: { id },
      select: intervistaSelect,
    });
    if (!intervista) {
      throw new NotFoundException(`Intervista ${id} not found`);
    }

    //prima di fare l'update controlla che con l'update i valori continuino ad essere possibili
    //se un valore rimane invariato, lo prendo dall'intervista già presente nel database
    await this.validateIntervista(
      {
        inizio: updateIntervistaDto.inizio ?? intervista.inizio,
        fine: updateIntervistaDto.fine ?? intervista.fine,
        candidato: updateIntervistaDto.candidato ?? intervista.candidato.id,
        intervistatori:
          updateIntervistaDto.intervistatori ??
          intervista.intervistatori.map((intervistatore) => intervistatore.id),
        ricerca: updateIntervistaDto.ricerca ?? intervista.ricerca.id,
      },
      id,
    );

    const updateData = this.mapper.updateDtoToModel(updateIntervistaDto);

    const updatedIntervista = await this.prisma.intervista.update({
      where: { id },
      data: updateData,
      select: intervistaSelect,
    });

    return this.mapper.modelToDto(updatedIntervista);
  }

  async remove(id: number) {
    const intervista = await this.prisma.intervista.findUnique({
      where: { id },
      select: intervistaSelect,
    });
    if (!intervista) {
      throw new NotFoundException(`Intervista ${id} not found`);
    }

    const deletedIntervista = await this.prisma.intervista.delete({
      where: { id },
      select: intervistaSelect,
    });

    return this.mapper.modelToDto(deletedIntervista);
  }
}
