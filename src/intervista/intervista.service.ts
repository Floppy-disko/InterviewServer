import { Injectable } from '@nestjs/common';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { UpdateIntervistaDto } from './dto/update-intervista.dto';
import { ResponseIntervistaDto } from './dto/response-intervista.dto';
import { PrismaService } from 'src/prisma.service';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto';
import { IntervistaMapper } from './intervista.mapper';

@Injectable()
export class IntervistaService {

  constructor(
    private prisma: PrismaService,
    private mapper: IntervistaMapper,
  ) { }

  async create(data: CreateIntervistaDto): Promise<ResponseIntervistaDto> {
    const intervista = await this.prisma.intervista.create({
      data: this.mapper.createDtoToModel(data),
      include: {
        candidato: true,
        intervistatori: true,
        ricerca: true,
      }
    });
    return this.mapper.modelToResponseDto(intervista);
  }

  async findAll(params: IntervistaListParamsDto): Promise<ResponseIntervistaDto[]> {
    return new Promise((resolve, reject) => {
      reject(new Error('Method not implemented.'));
    });
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
