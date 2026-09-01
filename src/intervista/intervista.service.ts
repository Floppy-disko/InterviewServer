import { Injectable } from '@nestjs/common';
import { CreateIntervistaDto } from './dto/create-intervista.dto';
import { UpdateIntervistaDto } from './dto/update-intervista.dto';

@Injectable()
export class IntervistaService {
  create(createIntervistaDto: CreateIntervistaDto) {
    return 'This action adds a new intervista';
  }

  findAll() {
    return `This action returns all intervista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intervista`;
  }

  update(id: number, updateIntervistaDto: UpdateIntervistaDto) {
    return `This action updates a #${id} intervista`;
  }

  remove(id: number) {
    return `This action removes a #${id} intervista`;
  }
}
